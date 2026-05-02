import * as cdk from 'aws-cdk-lib'
import * as cognito from 'aws-cdk-lib/aws-cognito'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as budgets from 'aws-cdk-lib/aws-budgets'
import * as cr from 'aws-cdk-lib/custom-resources'
import { Construct } from 'constructs'

export class NexoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // ─── Cognito User Pool ───────────────────────────────────────────
    const userPool = new cognito.UserPool(this, 'NexoUserPool', {
      userPoolName: 'nexo-users',
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      standardAttributes: {
        email: { required: true, mutable: true },
        givenName: { required: true, mutable: true },
        familyName: { required: false, mutable: true },
        phoneNumber: { required: false, mutable: true },
      },
      customAttributes: {
        tipo: new cognito.StringAttribute({ mutable: true }),
        movil: new cognito.StringAttribute({ mutable: true }),
        telefono: new cognito.StringAttribute({ mutable: true }),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: false,
        requireDigits: true,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    })

    // App Client (para frontend)
    const userPoolClient = new cognito.UserPoolClient(this, 'NexoUserPoolClient', {
      userPool,
      userPoolClientName: 'nexo-web',
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      generateSecret: false,
    })

    // Grupos
    new cognito.CfnUserPoolGroup(this, 'AdminGroup', {
      userPoolId: userPool.userPoolId,
      groupName: 'admin',
      description: 'Administradores de nexo',
    })

    new cognito.CfnUserPoolGroup(this, 'UserGroup', {
      userPoolId: userPool.userPoolId,
      groupName: 'user',
      description: 'Clientes de nexo',
    })

    // ─── DynamoDB — Usuarios ─────────────────────────────────────────
    const usersTable = new dynamodb.Table(this, 'NexoUsersTable', {
      tableName: 'nexo-users',
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    })

    usersTable.addGlobalSecondaryIndex({
      indexName: 'email-index',
      partitionKey: { name: 'email', type: dynamodb.AttributeType.STRING },
    })

    // ─── DynamoDB — Pedidos ──────────────────────────────────────────
    const ordersTable = new dynamodb.Table(this, 'NexoOrdersTable', {
      tableName: 'nexo-orders',
      partitionKey: { name: 'orderId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    })

    ordersTable.addGlobalSecondaryIndex({
      indexName: 'userId-index',
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
    })

    // ─── DynamoDB — Direcciones ──────────────────────────────────────
    const addressesTable = new dynamodb.Table(this, 'NexoAddressesTable', {
      tableName: 'nexo-addresses',
      partitionKey: { name: 'addressId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    })

    addressesTable.addGlobalSecondaryIndex({
      indexName: 'userId-index',
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
    })

    // ─── DynamoDB — Reseñas ─────────────────────────────────────────
    const reviewsTable = new dynamodb.Table(this, 'NexoReviewsTable', {
      tableName: 'nexo-reviews',
      partitionKey: { name: 'reviewId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    })

    reviewsTable.addGlobalSecondaryIndex({
      indexName: 'userId-index',
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
    })

    // ─── Lambda — Direcciones ────────────────────────────────────────
    const addressesLambda = new lambda.Function(this, 'NexoAddressesLambda', {
      functionName: 'nexo-addresses-api',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const { DynamoDBClient, PutItemCommand, QueryCommand, UpdateItemCommand, DeleteItemCommand, ScanCommand } = require('@aws-sdk/client-dynamodb')
        const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb')
        const { randomUUID } = require('crypto')

        const dynamo = new DynamoDBClient({})
        const TABLE_NAME = process.env.TABLE_NAME

        exports.handler = async (event) => {
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Authorization,Content-Type'
          }
          const method = event.httpMethod
          const claims = event.requestContext?.authorizer?.claims || {}
          const userId = claims.sub
          const addressId = event.pathParameters?.addressId

          try {
            // GET /addresses
            if (method === 'GET') {
              const result = await dynamo.send(new QueryCommand({
                TableName: TABLE_NAME,
                IndexName: 'userId-index',
                KeyConditionExpression: 'userId = :uid',
                ExpressionAttributeValues: marshall({ ':uid': userId }),
              }))
              const items = (result.Items || []).map(i => unmarshall(i))
              items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
              return { statusCode: 200, headers, body: JSON.stringify(items) }
            }

            // POST /addresses
            if (method === 'POST' && !addressId) {
              // Max 2 check
              const existing = await dynamo.send(new QueryCommand({
                TableName: TABLE_NAME,
                IndexName: 'userId-index',
                KeyConditionExpression: 'userId = :uid',
                ExpressionAttributeValues: marshall({ ':uid': userId }),
              }))
              if ((existing.Count || 0) >= 2) {
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'Máximo 2 direcciones permitidas.' }) }
              }
              const body = JSON.parse(event.body || '{}')
              if (!body.province || !body.canton || !body.district || !body.senas) {
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'Todos los campos son requeridos.' }) }
              }
              const isFirst = (existing.Count || 0) === 0
              const item = {
                addressId: randomUUID(),
                userId,
                province: body.province,
                canton: body.canton,
                district: body.district,
                senas: body.senas.trim(),
                isDefault: isFirst,
                createdAt: new Date().toISOString(),
              }
              await dynamo.send(new PutItemCommand({ TableName: TABLE_NAME, Item: marshall(item) }))
              return { statusCode: 201, headers, body: JSON.stringify(item) }
            }

            // PUT /addresses/{addressId}
            if (method === 'PUT' && addressId) {
              const body = JSON.parse(event.body || '{}')
              // If setting as default, clear default on others first
              if (body.isDefault === true) {
                const all = await dynamo.send(new QueryCommand({
                  TableName: TABLE_NAME,
                  IndexName: 'userId-index',
                  KeyConditionExpression: 'userId = :uid',
                  ExpressionAttributeValues: marshall({ ':uid': userId }),
                }))
                for (const raw of (all.Items || [])) {
                  const addr = unmarshall(raw)
                  if (addr.addressId !== addressId && addr.isDefault) {
                    await dynamo.send(new UpdateItemCommand({
                      TableName: TABLE_NAME,
                      Key: marshall({ addressId: addr.addressId }),
                      UpdateExpression: 'SET isDefault = :f',
                      ExpressionAttributeValues: marshall({ ':f': false }),
                    }))
                  }
                }
              }
              const exprParts = []
              const exprValues = {}
              if (body.province !== undefined) { exprParts.push('province = :pv'); exprValues[':pv'] = body.province }
              if (body.canton !== undefined) { exprParts.push('canton = :ca'); exprValues[':ca'] = body.canton }
              if (body.district !== undefined) { exprParts.push('district = :di'); exprValues[':di'] = body.district }
              if (body.senas !== undefined) { exprParts.push('senas = :se'); exprValues[':se'] = body.senas }
              if (body.isDefault !== undefined) { exprParts.push('isDefault = :id'); exprValues[':id'] = body.isDefault }
              if (exprParts.length === 0) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Sin cambios.' }) }
              await dynamo.send(new UpdateItemCommand({
                TableName: TABLE_NAME,
                Key: marshall({ addressId }),
                UpdateExpression: 'SET ' + exprParts.join(', '),
                ExpressionAttributeValues: marshall(exprValues),
              }))
              return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
            }

            // DELETE /addresses/{addressId}
            if (method === 'DELETE' && addressId) {
              const all = await dynamo.send(new QueryCommand({
                TableName: TABLE_NAME,
                IndexName: 'userId-index',
                KeyConditionExpression: 'userId = :uid',
                ExpressionAttributeValues: marshall({ ':uid': userId }),
              }))
              if ((all.Count || 0) <= 1) {
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'Debe mantener al menos una dirección.' }) }
              }
              const target = (all.Items || []).map(i => unmarshall(i)).find(a => a.addressId === addressId)
              await dynamo.send(new DeleteItemCommand({ TableName: TABLE_NAME, Key: marshall({ addressId }) }))
              // If deleted was default, set first remaining as default
              if (target?.isDefault) {
                const remaining = (all.Items || []).map(i => unmarshall(i)).find(a => a.addressId !== addressId)
                if (remaining) {
                  await dynamo.send(new UpdateItemCommand({
                    TableName: TABLE_NAME,
                    Key: marshall({ addressId: remaining.addressId }),
                    UpdateExpression: 'SET isDefault = :t',
                    ExpressionAttributeValues: marshall({ ':t': true }),
                  }))
                }
              }
              return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
            }

            return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not found' }) }
          } catch (err) {
            return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) }
          }
        }
      `),
      environment: { TABLE_NAME: addressesTable.tableName },
      timeout: cdk.Duration.seconds(15),
    })

    addressesTable.grantReadWriteData(addressesLambda)

    // ─── Lambda — Admin CRUD usuarios ───────────────────────────────
    const adminLambda = new lambda.Function(this, 'NexoAdminLambda', {
      functionName: 'nexo-admin-users',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const { CognitoIdentityProviderClient, ListUsersCommand, AdminGetUserCommand, AdminUpdateUserAttributesCommand, AdminDeleteUserCommand, AdminDisableUserCommand } = require('@aws-sdk/client-cognito-identity-provider')
        const { DynamoDBClient, DeleteItemCommand } = require('@aws-sdk/client-dynamodb')

        const cognito = new CognitoIdentityProviderClient({})
        const dynamo = new DynamoDBClient({})
        const USER_POOL_ID = process.env.USER_POOL_ID
        const TABLE_NAME = process.env.TABLE_NAME

        exports.handler = async (event) => {
          const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Authorization,Content-Type' }
          const method = event.httpMethod
          const path = event.path
          const userId = event.pathParameters?.userId

          try {
            if (method === 'GET' && path === '/admin/users') {
              const result = await cognito.send(new ListUsersCommand({ UserPoolId: USER_POOL_ID, Limit: 60 }))
              return { statusCode: 200, headers, body: JSON.stringify(result.Users) }
            }
            if (method === 'GET' && userId) {
              const result = await cognito.send(new AdminGetUserCommand({ UserPoolId: USER_POOL_ID, Username: userId }))
              return { statusCode: 200, headers, body: JSON.stringify(result) }
            }
            if (method === 'PUT' && userId) {
              const body = JSON.parse(event.body || '{}')
              const attrs = Object.entries(body).map(([Name, Value]) => ({ Name, Value: String(Value) }))
              await cognito.send(new AdminUpdateUserAttributesCommand({ UserPoolId: USER_POOL_ID, Username: userId, UserAttributes: attrs }))
              return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
            }
            if (method === 'DELETE' && userId) {
              await cognito.send(new AdminDeleteUserCommand({ UserPoolId: USER_POOL_ID, Username: userId }))
              await dynamo.send(new DeleteItemCommand({ TableName: TABLE_NAME, Key: { userId: { S: userId } } }))
              return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
            }
            return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not found' }) }
          } catch (err) {
            return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) }
          }
        }
      `),
      environment: {
        USER_POOL_ID: userPool.userPoolId,
        TABLE_NAME: usersTable.tableName,
      },
      timeout: cdk.Duration.seconds(15),
    })

    adminLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        'cognito-idp:ListUsers',
        'cognito-idp:AdminGetUser',
        'cognito-idp:AdminUpdateUserAttributes',
        'cognito-idp:AdminDeleteUser',
        'cognito-idp:AdminDisableUser',
      ],
      resources: [userPool.userPoolArn],
    }))
    usersTable.grantReadWriteData(adminLambda)

    // ─── Lambda — Pedidos ────────────────────────────────────────────
    const ordersLambda = new lambda.Function(this, 'NexoOrdersLambda', {
      functionName: 'nexo-orders-api',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const { DynamoDBClient, PutItemCommand, QueryCommand, ScanCommand, UpdateItemCommand, DeleteItemCommand } = require('@aws-sdk/client-dynamodb')
        const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb')
        const { randomUUID } = require('crypto')

        const dynamo = new DynamoDBClient({})
        const TABLE_NAME = process.env.TABLE_NAME

        exports.handler = async (event) => {
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Authorization,Content-Type'
          }
          const method = event.httpMethod
          const path = event.path
          const claims = event.requestContext?.authorizer?.claims || {}
          const callerId = claims.sub
          const groups = claims['cognito:groups'] || ''
          const isAdmin = groups.includes('admin')
          const orderId = event.pathParameters?.orderId

          try {
            // POST /orders — crear pedido (usuario autenticado)
            if (method === 'POST' && path === '/orders') {
              const body = JSON.parse(event.body || '{}')
              if (!body.trackingNumber) {
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'trackingNumber es requerido' }) }
              }
              const item = {
                orderId: randomUUID(),
                userId: callerId,
                userName: claims.given_name || '',
                userEmail: claims.email || '',
                trackingNumber: body.trackingNumber.trim(),
                description: (body.description || '').trim(),
                startDate: new Date().toISOString(),
                status: 'en_ruta',
                updatedAt: new Date().toISOString(),
                ...(body.deliveryProvince && { deliveryProvince: body.deliveryProvince }),
                ...(body.deliveryCanton  && { deliveryCanton:  body.deliveryCanton  }),
                ...(body.deliveryDistrict && { deliveryDistrict: body.deliveryDistrict }),
                ...(body.deliverySenas   && { deliverySenas:   body.deliverySenas.trim() }),
              }
              await dynamo.send(new PutItemCommand({ TableName: TABLE_NAME, Item: marshall(item) }))
              return { statusCode: 201, headers, body: JSON.stringify(item) }
            }

            // GET /orders — pedidos del usuario autenticado
            if (method === 'GET' && path === '/orders') {
              const result = await dynamo.send(new QueryCommand({
                TableName: TABLE_NAME,
                IndexName: 'userId-index',
                KeyConditionExpression: 'userId = :uid',
                ExpressionAttributeValues: marshall({ ':uid': callerId }),
                ScanIndexForward: false,
              }))
              const items = (result.Items || []).map(i => unmarshall(i))
              return { statusCode: 200, headers, body: JSON.stringify(items) }
            }

            // GET /admin/orders — todos los pedidos (solo admin)
            if (method === 'GET' && path === '/admin/orders') {
              if (!isAdmin) return { statusCode: 403, headers, body: JSON.stringify({ error: 'Acceso denegado' }) }
              const result = await dynamo.send(new ScanCommand({ TableName: TABLE_NAME }))
              const items = (result.Items || []).map(i => unmarshall(i))
              items.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
              return { statusCode: 200, headers, body: JSON.stringify(items) }
            }

            // POST /admin/orders — crear pedido en nombre de un usuario (solo admin)
            if (method === 'POST' && path === '/admin/orders') {
              if (!isAdmin) return { statusCode: 403, headers, body: JSON.stringify({ error: 'Acceso denegado' }) }
              const body = JSON.parse(event.body || '{}')
              if (!body.trackingNumber || !body.userId) {
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'trackingNumber y userId son requeridos' }) }
              }
              const item = {
                orderId: randomUUID(),
                userId: body.userId,
                userName: body.userName || '',
                userEmail: body.userEmail || '',
                trackingNumber: body.trackingNumber.trim(),
                description: (body.description || '').trim(),
                startDate: new Date().toISOString(),
                status: 'en_ruta',
                updatedAt: new Date().toISOString(),
              }
              await dynamo.send(new PutItemCommand({ TableName: TABLE_NAME, Item: marshall(item) }))
              return { statusCode: 201, headers, body: JSON.stringify(item) }
            }

            // DELETE /admin/orders/{orderId} — eliminar pedido (solo admin)
            if (method === 'DELETE' && orderId) {
              if (!isAdmin) return { statusCode: 403, headers, body: JSON.stringify({ error: 'Acceso denegado' }) }
              await dynamo.send(new DeleteItemCommand({
                TableName: TABLE_NAME,
                Key: marshall({ orderId }),
              }))
              return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
            }

            // PUT /admin/orders/{orderId} — actualizar pedido (solo admin)
            if (method === 'PUT' && orderId) {
              if (!isAdmin) return { statusCode: 403, headers, body: JSON.stringify({ error: 'Acceso denegado' }) }
              const body = JSON.parse(event.body || '{}')
              const exprParts = ['updatedAt = :u']
              const exprNames = {}
              const exprValues = { ':u': new Date().toISOString() }
              if (body.status) { exprParts.push('#s = :s'); exprNames['#s'] = 'status'; exprValues[':s'] = body.status }
              if (body.peso !== undefined) { exprParts.push('peso = :p'); exprValues[':p'] = body.peso }
              if (body.totalPagado !== undefined) { exprParts.push('totalPagado = :t'); exprValues[':t'] = body.totalPagado }
              if (body.trackingNumber !== undefined) { exprParts.push('trackingNumber = :tr'); exprValues[':tr'] = body.trackingNumber }
              if (body.description !== undefined) { exprParts.push('#d = :d'); exprNames['#d'] = 'description'; exprValues[':d'] = body.description }
              await dynamo.send(new UpdateItemCommand({
                TableName: TABLE_NAME,
                Key: marshall({ orderId }),
                UpdateExpression: 'SET ' + exprParts.join(', '),
                ...(Object.keys(exprNames).length ? { ExpressionAttributeNames: exprNames } : {}),
                ExpressionAttributeValues: marshall(exprValues),
              }))
              return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
            }

            return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not found' }) }
          } catch (err) {
            return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) }
          }
        }
      `),
      environment: {
        TABLE_NAME: ordersTable.tableName,
      },
      timeout: cdk.Duration.seconds(15),
    })

    ordersTable.grantReadWriteData(ordersLambda)

    // ─── Lambda — Reseñas ────────────────────────────────────────────
    const reviewsLambda = new lambda.Function(this, 'NexoReviewsLambda', {
      functionName: 'nexo-reviews-api',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const { DynamoDBClient, PutItemCommand, ScanCommand, QueryCommand, DeleteItemCommand } = require('@aws-sdk/client-dynamodb')
        const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb')
        const { randomUUID } = require('crypto')

        const dynamo = new DynamoDBClient({})
        const REVIEWS_TABLE = process.env.REVIEWS_TABLE
        const ORDERS_TABLE = process.env.ORDERS_TABLE

        exports.handler = async (event) => {
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Authorization,Content-Type'
          }
          const method = event.httpMethod

          try {
            // GET /reviews — público, sin auth
            if (method === 'GET') {
              const result = await dynamo.send(new ScanCommand({ TableName: REVIEWS_TABLE }))
              const items = (result.Items || []).map(i => unmarshall(i))
              items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              return { statusCode: 200, headers, body: JSON.stringify(items) }
            }

            // POST /reviews — requiere auth, valida pedido entregado
            if (method === 'POST') {
              const claims = event.requestContext?.authorizer?.claims || {}
              const userId = claims.sub
              if (!userId) return { statusCode: 401, headers, body: JSON.stringify({ error: 'No autenticado.' }) }

              const body = JSON.parse(event.body || '{}')
              const rating = Number(body.rating)
              if (!rating || rating < 1 || rating > 5) {
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'Rating debe ser entre 1 y 5.' }) }
              }
              if (!body.comment || body.comment.trim().length < 10) {
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'El comentario debe tener al menos 10 caracteres.' }) }
              }

              // Verificar pedido entregado
              const ordersResult = await dynamo.send(new QueryCommand({
                TableName: ORDERS_TABLE,
                IndexName: 'userId-index',
                KeyConditionExpression: 'userId = :uid',
                FilterExpression: '#s = :entregado',
                ExpressionAttributeNames: { '#s': 'status' },
                ExpressionAttributeValues: marshall({ ':uid': userId, ':entregado': 'entregado' }),
              }))
              if (!ordersResult.Count || ordersResult.Count === 0) {
                return { statusCode: 403, headers, body: JSON.stringify({ error: 'Necesitás al menos un pedido entregado para dejar una reseña.' }) }
              }

              // Verificar que el usuario no haya ya dejado reseña
              const existing = await dynamo.send(new QueryCommand({
                TableName: REVIEWS_TABLE,
                IndexName: 'userId-index',
                KeyConditionExpression: 'userId = :uid',
                ExpressionAttributeValues: marshall({ ':uid': userId }),
              }))
              if (existing.Count && existing.Count > 0) {
                return { statusCode: 409, headers, body: JSON.stringify({ error: 'Ya dejaste una reseña anteriormente.' }) }
              }

              const userName = claims.given_name || claims.email?.split('@')[0] || 'Usuario'
              const item = {
                reviewId: randomUUID(),
                userId,
                userName,
                rating,
                comment: body.comment.trim(),
                createdAt: new Date().toISOString(),
              }
              await dynamo.send(new PutItemCommand({ TableName: REVIEWS_TABLE, Item: marshall(item) }))
              return { statusCode: 201, headers, body: JSON.stringify(item) }
            }

            // DELETE /admin/reviews/{reviewId} — solo admin
            if (method === 'DELETE') {
              const claims = event.requestContext?.authorizer?.claims || {}
              const groups = claims['cognito:groups'] || ''
              if (!groups.includes('admin')) {
                return { statusCode: 403, headers, body: JSON.stringify({ error: 'Acceso denegado' }) }
              }
              const reviewId = event.pathParameters?.reviewId
              if (!reviewId) return { statusCode: 400, headers, body: JSON.stringify({ error: 'reviewId requerido' }) }
              await dynamo.send(new DeleteItemCommand({
                TableName: REVIEWS_TABLE,
                Key: marshall({ reviewId }),
              }))
              return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
            }

            return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not found' }) }
          } catch (err) {
            return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) }
          }
        }
      `),
      environment: {
        REVIEWS_TABLE: reviewsTable.tableName,
        ORDERS_TABLE: ordersTable.tableName,
      },
      timeout: cdk.Duration.seconds(15),
    })

    reviewsTable.grantReadWriteData(reviewsLambda)
    ordersTable.grantReadData(reviewsLambda)

    // ─── Seed de reseñas iniciales ───────────────────────────────────
    const seedDate1 = '2025-11-15T14:23:00.000Z'
    const seedDate2 = '2025-12-03T09:10:00.000Z'
    const seedDate3 = '2026-01-20T16:45:00.000Z'

    new cr.AwsCustomResource(this, 'ReviewsSeed', {
      onCreate: {
        service: 'DynamoDB',
        action: 'batchWriteItem',
        parameters: {
          RequestItems: {
            'nexo-reviews': [
              { PutRequest: { Item: { reviewId: { S: 'seed-001' }, userId: { S: 'seed' }, userName: { S: 'Ana Rodríguez' }, rating: { N: '5' }, comment: { S: '¡Increíble servicio! Mi paquete llegó en 5 días y en perfectas condiciones. Definitivamente volvería a usar Nexo.' }, createdAt: { S: seedDate1 } } } },
              { PutRequest: { Item: { reviewId: { S: 'seed-002' }, userId: { S: 'seed' }, userName: { S: 'Carlos Jiménez' }, rating: { N: '5' }, comment: { S: 'Super rápido y confiable. Ya llevo 3 pedidos con Nexo y siempre excelente. El seguimiento en tiempo real es muy útil.' }, createdAt: { S: seedDate2 } } } },
              { PutRequest: { Item: { reviewId: { S: 'seed-003' }, userId: { S: 'seed' }, userName: { S: 'María González' }, rating: { N: '5' }, comment: { S: 'Muy buena experiencia. Precios justos y atención al cliente excelente cuando tuve una consulta.' }, createdAt: { S: seedDate3 } } } },
            ],
          },
        },
        physicalResourceId: cr.PhysicalResourceId.of('ReviewsSeed'),
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({ resources: [reviewsTable.tableArn] }),
    })

    // ─── API Gateway ─────────────────────────────────────────────────
    const api = new apigateway.RestApi(this, 'NexoAdminApi', {
      restApiName: 'nexo-admin-api',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Authorization', 'Content-Type'],
      },
    })

    // Cognito Authorizer
    const authorizer = new apigateway.CognitoUserPoolsAuthorizer(this, 'NexoAuthorizer', {
      cognitoUserPools: [userPool],
      authorizerName: 'nexo-cognito-authorizer',
    })

    const authOptions: apigateway.MethodOptions = {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    }

    // Rutas /admin/users (sin auth por ahora — acceso interno)
    const adminResource = api.root.addResource('admin')
    const usersResource = adminResource.addResource('users')
    const userResource = usersResource.addResource('{userId}')

    const adminIntegration = new apigateway.LambdaIntegration(adminLambda)
    usersResource.addMethod('GET', adminIntegration, authOptions)
    userResource.addMethod('GET', adminIntegration, authOptions)
    userResource.addMethod('PUT', adminIntegration, authOptions)
    userResource.addMethod('DELETE', adminIntegration, authOptions)

    // Rutas /orders (usuario autenticado)
    const ordersIntegration = new apigateway.LambdaIntegration(ordersLambda)
    const ordersResource = api.root.addResource('orders')
    ordersResource.addMethod('GET', ordersIntegration, authOptions)
    ordersResource.addMethod('POST', ordersIntegration, authOptions)

    // Rutas /admin/orders (admin)
    const adminOrdersResource = adminResource.addResource('orders')
    const adminOrderResource = adminOrdersResource.addResource('{orderId}')
    adminOrdersResource.addMethod('GET', ordersIntegration, authOptions)
    adminOrdersResource.addMethod('POST', ordersIntegration, authOptions)
    adminOrderResource.addMethod('PUT', ordersIntegration, authOptions)
    adminOrderResource.addMethod('DELETE', ordersIntegration, authOptions)

    // Rutas /reviews — GET público, POST con auth
    const reviewsIntegration = new apigateway.LambdaIntegration(reviewsLambda)
    const reviewsResource = api.root.addResource('reviews')
    reviewsResource.addMethod('GET', reviewsIntegration)
    reviewsResource.addMethod('POST', reviewsIntegration, authOptions)

    // Ruta /admin/reviews/{reviewId} — DELETE admin
    const adminReviewsResource = adminResource.addResource('reviews')
    const adminReviewResource = adminReviewsResource.addResource('{reviewId}')
    adminReviewResource.addMethod('DELETE', reviewsIntegration, authOptions)

    // Rutas /addresses (usuario autenticado)
    const addressesIntegration = new apigateway.LambdaIntegration(addressesLambda)
    const addressesResource = api.root.addResource('addresses')
    const addressResource = addressesResource.addResource('{addressId}')
    addressesResource.addMethod('GET', addressesIntegration, authOptions)
    addressesResource.addMethod('POST', addressesIntegration, authOptions)
    addressResource.addMethod('PUT', addressesIntegration, authOptions)
    addressResource.addMethod('DELETE', addressesIntegration, authOptions)

    // ─── Budget Alert ────────────────────────────────────────────────
    new budgets.CfnBudget(this, 'NexoBudget', {
      budget: {
        budgetName: 'nexo-monthly-limit',
        budgetType: 'COST',
        timeUnit: 'MONTHLY',
        budgetLimit: { amount: 20, unit: 'USD' },
      },
      notificationsWithSubscribers: [
        {
          notification: {
            notificationType: 'ACTUAL',
            comparisonOperator: 'GREATER_THAN',
            threshold: 80,
            thresholdType: 'PERCENTAGE',
          },
          subscribers: [{ subscriptionType: 'EMAIL', address: 'nexxo.courier+prod@gmail.com' }],
        },
        {
          notification: {
            notificationType: 'ACTUAL',
            comparisonOperator: 'GREATER_THAN',
            threshold: 100,
            thresholdType: 'PERCENTAGE',
          },
          subscribers: [{ subscriptionType: 'EMAIL', address: 'nexxo.courier+prod@gmail.com' }],
        },
      ],
    })

    // ─── Outputs ─────────────────────────────────────────────────────
    new cdk.CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId })
    new cdk.CfnOutput(this, 'UserPoolClientId', { value: userPoolClient.userPoolClientId })
    new cdk.CfnOutput(this, 'ApiUrl', { value: api.url })
    new cdk.CfnOutput(this, 'UsersTableName', { value: usersTable.tableName })
    new cdk.CfnOutput(this, 'OrdersTableName', { value: ordersTable.tableName })
  }
}
