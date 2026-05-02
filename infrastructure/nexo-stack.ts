import * as cdk from 'aws-cdk-lib'
import * as cognito from 'aws-cdk-lib/aws-cognito'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as budgets from 'aws-cdk-lib/aws-budgets'
import * as cr from 'aws-cdk-lib/custom-resources'
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager'
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
          const allowed = (process.env.CORS_ORIGINS || 'https://www.nexocourier.com').split(',')
          const reqOrigin = (event.headers || {})['origin'] || (event.headers || {})['Origin'] || ''
          const corsOrigin = allowed.includes(reqOrigin) ? reqOrigin : allowed[0]
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin,
            'Access-Control-Allow-Headers': 'Authorization,Content-Type',
            'Vary': 'Origin'
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
      environment: {
        TABLE_NAME: addressesTable.tableName,
        CORS_ORIGINS: 'https://www.nexocourier.com,http://localhost:3000',
      },
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
          const allowed = (process.env.CORS_ORIGINS || 'https://www.nexocourier.com').split(',')
          const reqOrigin = (event.headers || {})['origin'] || (event.headers || {})['Origin'] || ''
          const corsOrigin = allowed.includes(reqOrigin) ? reqOrigin : allowed[0]
          const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin, 'Access-Control-Allow-Headers': 'Authorization,Content-Type', 'Vary': 'Origin' }
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
        CORS_ORIGINS: 'https://www.nexocourier.com,http://localhost:3000',
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
          const allowed = (process.env.CORS_ORIGINS || 'https://www.nexocourier.com').split(',')
          const reqOrigin = (event.headers || {})['origin'] || (event.headers || {})['Origin'] || ''
          const corsOrigin = allowed.includes(reqOrigin) ? reqOrigin : allowed[0]
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin,
            'Access-Control-Allow-Headers': 'Authorization,Content-Type',
            'Vary': 'Origin'
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
              const now = new Date().toISOString()
              const exprParts = ['updatedAt = :u']
              const exprNames = {}
              const exprValues = { ':u': now }
              if (body.status) {
                exprParts.push('#s = :s'); exprNames['#s'] = 'status'; exprValues[':s'] = body.status
                console.log(JSON.stringify({ event: 'ORDER_STATUS_CHANGE', orderId, to: body.status, by: callerId, at: now }))
              }
              if (body.peso !== undefined) {
                const peso = Number(body.peso)
                if (isNaN(peso) || peso < 0 || peso > 500) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Peso inválido (0–500 kg).' }) }
                exprParts.push('peso = :p'); exprValues[':p'] = peso
              }
              if (body.totalPagado !== undefined) {
                const total = Number(body.totalPagado)
                if (isNaN(total) || total < 0 || total > 9999) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Total inválido.' }) }
                exprParts.push('totalPagado = :t'); exprValues[':t'] = total
                console.log(JSON.stringify({ event: 'ORDER_AMOUNT_SET', orderId, totalPagado: total, by: callerId, at: now }))
              }
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
        CORS_ORIGINS: 'https://www.nexocourier.com,http://localhost:3000',
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
          const allowed = (process.env.CORS_ORIGINS || 'https://www.nexocourier.com').split(',')
          const reqOrigin = (event.headers || {})['origin'] || (event.headers || {})['Origin'] || ''
          const corsOrigin = allowed.includes(reqOrigin) ? reqOrigin : allowed[0]
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin,
            'Access-Control-Allow-Headers': 'Authorization,Content-Type',
            'Vary': 'Origin'
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
        CORS_ORIGINS: 'https://www.nexocourier.com,http://localhost:3000',
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

    // ─── Secrets Manager — ONVO ─────────────────────────────────────
    const onvoSecret = new secretsmanager.Secret(this, 'OnvoSecret', {
      secretName: 'nexo/onvo',
      description: 'ONVO payment gateway: apiKey y webhookSecret. Actualizar manualmente desde consola AWS.',
      secretStringValue: cdk.SecretValue.unsafePlainText(JSON.stringify({
        apiKey: 'PENDIENTE_DE_ACTIVACION',
        webhookSecret: 'PENDIENTE_DE_ACTIVACION',
      })),
    })

    // ─── Lambda — Pagos: crear sesión de cobro ───────────────────────
    const paymentCreateLambda = new lambda.Function(this, 'NexoPaymentCreateLambda', {
      functionName: 'nexo-payment-create',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const { DynamoDBClient, GetItemCommand, QueryCommand, UpdateItemCommand } = require('@aws-sdk/client-dynamodb')
        const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb')
        const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager')

        const dynamo = new DynamoDBClient({})
        const sm = new SecretsManagerClient({})
        const ORDERS_TABLE = process.env.ORDERS_TABLE
        const SECRET_ARN = process.env.SECRET_ARN
        const ONVO_API = 'https://api.onvopay.com/v1'

        async function getSecret() {
          const res = await sm.send(new GetSecretValueCommand({ SecretId: SECRET_ARN }))
          return JSON.parse(res.SecretString)
        }

        exports.handler = async (event) => {
          const allowed = (process.env.CORS_ORIGINS || 'https://www.nexocourier.com').split(',')
          const reqOrigin = (event.headers || {})['origin'] || (event.headers || {})['Origin'] || ''
          const corsOrigin = allowed.includes(reqOrigin) ? reqOrigin : allowed[0]
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin,
            'Access-Control-Allow-Headers': 'Authorization,Content-Type',
            'Vary': 'Origin'
          }
          try {
            const claims = event.requestContext?.authorizer?.claims || {}
            const userId = claims.sub
            if (!userId) return { statusCode: 401, headers, body: JSON.stringify({ error: 'No autenticado.' }) }

            const body = JSON.parse(event.body || '{}')
            const { orderId } = body
            if (!orderId) return { statusCode: 400, headers, body: JSON.stringify({ error: 'orderId requerido.' }) }

            // Obtener y verificar el pedido
            const result = await dynamo.send(new QueryCommand({
              TableName: ORDERS_TABLE,
              IndexName: 'userId-index',
              KeyConditionExpression: 'userId = :uid',
              FilterExpression: 'orderId = :oid',
              ExpressionAttributeValues: marshall({ ':uid': userId, ':oid': orderId }),
            }))
            if (!result.Count || result.Count === 0) {
              return { statusCode: 404, headers, body: JSON.stringify({ error: 'Pedido no encontrado.' }) }
            }
            const order = unmarshall(result.Items[0])
            if (!order.totalPagado || order.totalPagado <= 0) {
              return { statusCode: 400, headers, body: JSON.stringify({ error: 'El pedido aún no tiene monto asignado.' }) }
            }
            if (!['bodega_cr', 'pendiente_pago'].includes(order.status)) {
              return { statusCode: 400, headers, body: JSON.stringify({ error: 'El pedido no está listo para pagar.' }) }
            }

            const { apiKey } = await getSecret()
            const amountCents = Math.round(order.totalPagado * 100)
            const baseUrl = process.env.FRONTEND_URL || 'https://www.nexocourier.com'

            const onvoRes = await fetch(\`\${ONVO_API}/checkout/sessions/one-time-link\`, {
              method: 'POST',
              headers: { 'Authorization': \`Bearer \${apiKey}\`, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                amount: amountCents,
                currency: 'USD',
                description: \`Nexo Courier – Pedido \${order.trackingNumber}\`,
                successUrl: \`\${baseUrl}/pedidos?pago=exitoso&orderId=\${orderId}\`,
                cancelUrl: \`\${baseUrl}/pedidos?pago=cancelado\`,
              }),
            })

            if (!onvoRes.ok) {
              const err = await onvoRes.json()
              console.error(JSON.stringify({ event: 'ONVO_CREATE_ERROR', orderId, err }))
              return { statusCode: 502, headers, body: JSON.stringify({ error: 'Error al crear la sesión de pago.' }) }
            }

            const session = await onvoRes.json()
            console.log(JSON.stringify({ event: 'PAYMENT_SESSION_CREATED', orderId, userId, amount: amountCents, sessionId: session.id }))
            return { statusCode: 200, headers, body: JSON.stringify({ checkoutUrl: session.url || session.checkoutUrl || session.link }) }
          } catch (err) {
            console.error(JSON.stringify({ event: 'PAYMENT_CREATE_EXCEPTION', error: err.message }))
            return { statusCode: 500, headers, body: JSON.stringify({ error: 'Error interno.' }) }
          }
        }
      `),
      environment: {
        ORDERS_TABLE: ordersTable.tableName,
        SECRET_ARN: onvoSecret.secretArn,
        CORS_ORIGINS: 'https://www.nexocourier.com,http://localhost:3000',
        FRONTEND_URL: 'https://www.nexocourier.com',
      },
      timeout: cdk.Duration.seconds(30),
    })

    ordersTable.grantReadData(paymentCreateLambda)
    onvoSecret.grantRead(paymentCreateLambda)

    // ─── Lambda — Pagos: webhook de ONVO ────────────────────────────
    const paymentWebhookLambda = new lambda.Function(this, 'NexoPaymentWebhookLambda', {
      functionName: 'nexo-payment-webhook',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const { DynamoDBClient, UpdateItemCommand, QueryCommand } = require('@aws-sdk/client-dynamodb')
        const { marshall } = require('@aws-sdk/util-dynamodb')
        const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager')

        const dynamo = new DynamoDBClient({})
        const sm = new SecretsManagerClient({})
        const ORDERS_TABLE = process.env.ORDERS_TABLE
        const SECRET_ARN = process.env.SECRET_ARN

        async function getSecret() {
          const res = await sm.send(new GetSecretValueCommand({ SecretId: SECRET_ARN }))
          return JSON.parse(res.SecretString)
        }

        exports.handler = async (event) => {
          const headers = { 'Content-Type': 'application/json' }
          const now = new Date().toISOString()
          const rawBody = event.body || '{}'

          try {
            // Validar firma ONVO
            const incomingSecret = (event.headers || {})['X-Webhook-Secret'] || (event.headers || {})['x-webhook-secret'] || ''
            const { webhookSecret } = await getSecret()

            console.log(JSON.stringify({ event: 'WEBHOOK_RECEIVED', hasSecret: !!incomingSecret, at: now }))

            if (!incomingSecret || incomingSecret !== webhookSecret) {
              console.error(JSON.stringify({ event: 'WEBHOOK_INVALID_SECRET', at: now }))
              return { statusCode: 401, headers, body: JSON.stringify({ error: 'Firma inválida.' }) }
            }

            const payload = JSON.parse(rawBody)
            const { type, data } = payload

            console.log(JSON.stringify({ event: 'WEBHOOK_PAYLOAD', type, dataId: data?.id, status: data?.status, at: now }))

            // Solo procesar pagos confirmados
            if (type !== 'payment-intent.succeeded' && data?.status !== 'succeeded') {
              return { statusCode: 200, headers, body: JSON.stringify({ received: true }) }
            }

            const onvoTransactionId = data?.id
            const metadata = data?.metadata || {}
            const orderId = metadata?.orderId

            if (!orderId) {
              console.error(JSON.stringify({ event: 'WEBHOOK_MISSING_ORDER_ID', dataId: onvoTransactionId, at: now }))
              return { statusCode: 200, headers, body: JSON.stringify({ received: true }) }
            }

            // Idempotencia: verificar si ya fue procesado
            const existing = await dynamo.send(new QueryCommand({
              TableName: ORDERS_TABLE,
              IndexName: 'userId-index',
              KeyConditionExpression: 'userId = :dummy',
              FilterExpression: 'orderId = :oid AND attribute_exists(onvoTransactionId)',
              ExpressionAttributeValues: marshall({ ':dummy': '', ':oid': orderId }),
            })).catch(() => ({ Count: 0 }))

            // Actualizar pedido a pagado_en_ruta
            await dynamo.send(new UpdateItemCommand({
              TableName: ORDERS_TABLE,
              Key: marshall({ orderId }),
              UpdateExpression: 'SET #s = :s, onvoTransactionId = :txid, paidAt = :paid, updatedAt = :u',
              ExpressionAttributeNames: { '#s': 'status' },
              ExpressionAttributeValues: marshall({
                ':s': 'pagado_en_ruta',
                ':txid': onvoTransactionId,
                ':paid': now,
                ':u': now,
              }),
              ConditionExpression: 'attribute_not_exists(onvoTransactionId)',
            })).catch((err) => {
              if (err.name === 'ConditionalCheckFailedException') {
                console.log(JSON.stringify({ event: 'WEBHOOK_DUPLICATE', orderId, at: now }))
              } else {
                throw err
              }
            })

            console.log(JSON.stringify({ event: 'ORDER_PAID', orderId, onvoTransactionId, at: now }))
            return { statusCode: 200, headers, body: JSON.stringify({ received: true }) }
          } catch (err) {
            console.error(JSON.stringify({ event: 'WEBHOOK_EXCEPTION', error: err.message, at: now }))
            return { statusCode: 500, headers, body: JSON.stringify({ error: 'Error interno.' }) }
          }
        }
      `),
      environment: {
        ORDERS_TABLE: ordersTable.tableName,
        SECRET_ARN: onvoSecret.secretArn,
      },
      timeout: cdk.Duration.seconds(30),
    })

    ordersTable.grantReadWriteData(paymentWebhookLambda)
    onvoSecret.grantRead(paymentWebhookLambda)

    // ─── API Gateway ─────────────────────────────────────────────────
    const api = new apigateway.RestApi(this, 'NexoAdminApi', {
      restApiName: 'nexo-admin-api',
      defaultCorsPreflightOptions: {
        allowOrigins: ['https://www.nexocourier.com', 'http://localhost:3000'],
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

    // Rutas /payments — crear sesión (auth) y webhook (público)
    const paymentsResource = api.root.addResource('payments')
    const paymentCreateResource = paymentsResource.addResource('create')
    const paymentWebhookResource = paymentsResource.addResource('webhook')
    paymentCreateResource.addMethod('POST', new apigateway.LambdaIntegration(paymentCreateLambda), authOptions)
    paymentWebhookResource.addMethod('POST', new apigateway.LambdaIntegration(paymentWebhookLambda))

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
