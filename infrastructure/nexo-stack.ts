import * as cdk from 'aws-cdk-lib'
import * as cognito from 'aws-cdk-lib/aws-cognito'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as budgets from 'aws-cdk-lib/aws-budgets'
import * as cr from 'aws-cdk-lib/custom-resources'
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager'
import * as kms from 'aws-cdk-lib/aws-kms'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import * as path from 'path'

export class NexoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // â”€â”€â”€ Cognito User Pool â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      email: cognito.UserPoolEmail.withCognito(),
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    })

    // KMS key asimÃ©trica para cifrar los cÃ³digos de verificaciÃ³n de Cognito
    const emailSenderKey = new kms.Key(this, 'CognitoEmailSenderKey', {
      description: 'Cognito custom email sender encryption key (symmetric)',
    })
    emailSenderKey.addToResourcePolicy(new iam.PolicyStatement({
      principals: [new iam.ServicePrincipal('cognito-idp.amazonaws.com')],
      actions: ['kms:Encrypt'],
      resources: ['*'],
    }))

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

    // â”€â”€â”€ DynamoDB â€” Usuarios â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

    // â”€â”€â”€ DynamoDB â€” Pedidos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

    // â”€â”€â”€ DynamoDB â€” Direcciones â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

    // â”€â”€â”€ DynamoDB â€” ReseÃ±as â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

    // â”€â”€â”€ Lambda â€” Direcciones â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'MÃ¡ximo 2 direcciones permitidas.' }) }
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
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'Debe mantener al menos una direcciÃ³n.' }) }
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
        CORS_ORIGINS: 'https://www.nexocourier.com,https://nexocourier.com,http://localhost:3000',
      },
      timeout: cdk.Duration.seconds(15),
    })

    addressesTable.grantReadWriteData(addressesLambda)

    // â”€â”€â”€ Lambda â€” Admin CRUD usuarios â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        CORS_ORIGINS: 'https://www.nexocourier.com,https://nexocourier.com,http://localhost:3000',
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

    // â”€â”€â”€ Lambda â€” Pedidos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const ordersLambda = new lambda.Function(this, 'NexoOrdersLambda', {
      functionName: 'nexo-orders-api',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const { DynamoDBClient, PutItemCommand, QueryCommand, ScanCommand, UpdateItemCommand, DeleteItemCommand } = require('@aws-sdk/client-dynamodb')
        const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb')
        const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda')
        const { randomUUID } = require('crypto')

        const dynamo = new DynamoDBClient({})
        const lambdaClient = new LambdaClient({})
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
            // POST /orders â€” crear pedido (usuario autenticado)
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

            // GET /orders â€” pedidos del usuario autenticado
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

            // GET /admin/orders â€” todos los pedidos (solo admin)
            if (method === 'GET' && path === '/admin/orders') {
              if (!isAdmin) return { statusCode: 403, headers, body: JSON.stringify({ error: 'Acceso denegado' }) }
              const result = await dynamo.send(new ScanCommand({ TableName: TABLE_NAME }))
              const items = (result.Items || []).map(i => unmarshall(i))
              items.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
              return { statusCode: 200, headers, body: JSON.stringify(items) }
            }

            // POST /admin/orders â€” crear pedido en nombre de un usuario (solo admin)
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

            // DELETE /admin/orders/{orderId} â€” eliminar pedido (solo admin)
            if (method === 'DELETE' && orderId) {
              if (!isAdmin) return { statusCode: 403, headers, body: JSON.stringify({ error: 'Acceso denegado' }) }
              await dynamo.send(new DeleteItemCommand({
                TableName: TABLE_NAME,
                Key: marshall({ orderId }),
              }))
              return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
            }

            // PUT /admin/orders/{orderId} â€” actualizar pedido (solo admin)
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
                if (isNaN(peso) || peso < 0 || peso > 500) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Peso invÃ¡lido (0â€“500 kg).' }) }
                exprParts.push('peso = :p'); exprValues[':p'] = peso
              }
              if (body.totalPagado !== undefined) {
                const total = Number(body.totalPagado)
                if (isNaN(total) || total < 0 || total > 9999) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Total invÃ¡lido.' }) }
                exprParts.push('totalPagado = :t'); exprValues[':t'] = total
                console.log(JSON.stringify({ event: 'ORDER_AMOUNT_SET', orderId, totalPagado: total, by: callerId, at: now }))
              }
              if (body.trackingNumber !== undefined) { exprParts.push('trackingNumber = :tr'); exprValues[':tr'] = body.trackingNumber }
              if (body.description !== undefined) { exprParts.push('#d = :d'); exprNames['#d'] = 'description'; exprValues[':d'] = body.description }
              const updateResult = await dynamo.send(new UpdateItemCommand({
                TableName: TABLE_NAME,
                Key: marshall({ orderId }),
                UpdateExpression: 'SET ' + exprParts.join(', '),
                ...(Object.keys(exprNames).length ? { ExpressionAttributeNames: exprNames } : {}),
                ExpressionAttributeValues: marshall(exprValues),
                ReturnValues: 'ALL_NEW',
              }))
              if (body.status && updateResult.Attributes) {
                const updated = unmarshall(updateResult.Attributes)
                let discountPct = 0
                let totalBase = updated.totalPagado || 0
                let totalFinal = totalBase
                if (body.status === 'bodega_cr' && updated.userEmail && totalBase) {
                  try {
                    const scanResult = await dynamo.send(new ScanCommand({
                      TableName: TABLE_NAME,
                      FilterExpression: 'userEmail = :e AND #st IN (:s1, :s2, :s3)',
                      ExpressionAttributeNames: { '#st': 'status' },
                      ExpressionAttributeValues: marshall({ ':e': updated.userEmail, ':s1': 'bodega_cr', ':s2': 'pagado_en_ruta', ':s3': 'entregado' }),
                      ProjectionExpression: 'peso',
                    }))
                    const totalKg = (scanResult.Items || []).map(i => unmarshall(i).peso || 0).reduce((a, b) => a + b, 0)
                    if (totalKg >= 50) discountPct = 7
                    else if (totalKg >= 25) discountPct = 5
                    else if (totalKg >= 10) discountPct = 3
                    totalFinal = Math.round(totalBase * (1 - discountPct / 100) * 100) / 100
                  } catch (e) {
                    console.error(JSON.stringify({ event: 'LOYALTY_CALC_ERROR', error: e.message }))
                  }
                  await dynamo.send(new UpdateItemCommand({
                    TableName: TABLE_NAME,
                    Key: marshall({ orderId }),
                    UpdateExpression: 'SET totalBase = :tb, discountPct = :dp, totalFinal = :tf',
                    ExpressionAttributeValues: marshall({ ':tb': totalBase, ':dp': discountPct, ':tf': totalFinal }),
                  }))
                }
                console.log(JSON.stringify({ event: 'EMAIL_INVOKE_START', to: updated.userEmail, status: body.status, orderId }))
                try {
                  await lambdaClient.send(new InvokeCommand({
                    FunctionName: process.env.EMAIL_FUNCTION_NAME,
                    InvocationType: 'RequestResponse',
                    Payload: Buffer.from(JSON.stringify({
                      type: 'STATUS_CHANGE',
                      to: updated.userEmail,
                      data: { userName: updated.userName, trackingNumber: updated.trackingNumber, status: body.status, peso: updated.peso, totalBase, discountPct, totalFinal },
                    })),
                  }))
                  console.log(JSON.stringify({ event: 'EMAIL_INVOKE_OK', orderId, status: body.status }))
                } catch (err) {
                  console.error(JSON.stringify({ event: 'EMAIL_INVOKE_ERROR', error: err.message, orderId }))
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
        TABLE_NAME: ordersTable.tableName,
        CORS_ORIGINS: 'https://www.nexocourier.com,https://nexocourier.com,http://localhost:3000',
        EMAIL_FUNCTION_NAME: 'nexo-email-service',
      },
      timeout: cdk.Duration.seconds(15),
    })

    ordersTable.grantReadWriteData(ordersLambda)

    // â”€â”€â”€ Lambda â€” ReseÃ±as â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
            // GET /reviews â€” pÃºblico, sin auth
            if (method === 'GET') {
              const result = await dynamo.send(new ScanCommand({ TableName: REVIEWS_TABLE }))
              const items = (result.Items || []).map(i => unmarshall(i))
              items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              return { statusCode: 200, headers, body: JSON.stringify(items) }
            }

            // POST /reviews â€” requiere auth, valida pedido entregado
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
                return { statusCode: 403, headers, body: JSON.stringify({ error: 'NecesitÃ¡s al menos un pedido entregado para dejar una reseÃ±a.' }) }
              }

              // Verificar que el usuario no haya ya dejado reseÃ±a
              const existing = await dynamo.send(new QueryCommand({
                TableName: REVIEWS_TABLE,
                IndexName: 'userId-index',
                KeyConditionExpression: 'userId = :uid',
                ExpressionAttributeValues: marshall({ ':uid': userId }),
              }))
              if (existing.Count && existing.Count > 0) {
                return { statusCode: 409, headers, body: JSON.stringify({ error: 'Ya dejaste una reseÃ±a anteriormente.' }) }
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

            // DELETE /admin/reviews/{reviewId} â€” solo admin
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
        CORS_ORIGINS: 'https://www.nexocourier.com,https://nexocourier.com,http://localhost:3000',
      },
      timeout: cdk.Duration.seconds(15),
    })

    reviewsTable.grantReadWriteData(reviewsLambda)
    ordersTable.grantReadData(reviewsLambda)

    // â”€â”€â”€ Seed de reseÃ±as iniciales â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
              { PutRequest: { Item: { reviewId: { S: 'seed-001' }, userId: { S: 'seed' }, userName: { S: 'Ana RodrÃ­guez' }, rating: { N: '5' }, comment: { S: 'Â¡IncreÃ­ble servicio! Mi paquete llegÃ³ en 5 dÃ­as y en perfectas condiciones. Definitivamente volverÃ­a a usar Nexo.' }, createdAt: { S: seedDate1 } } } },
              { PutRequest: { Item: { reviewId: { S: 'seed-002' }, userId: { S: 'seed' }, userName: { S: 'Carlos JimÃ©nez' }, rating: { N: '5' }, comment: { S: 'Super rÃ¡pido y confiable. Ya llevo 3 pedidos con Nexo y siempre excelente. El seguimiento en tiempo real es muy Ãºtil.' }, createdAt: { S: seedDate2 } } } },
              { PutRequest: { Item: { reviewId: { S: 'seed-003' }, userId: { S: 'seed' }, userName: { S: 'MarÃ­a GonzÃ¡lez' }, rating: { N: '5' }, comment: { S: 'Muy buena experiencia. Precios justos y atenciÃ³n al cliente excelente cuando tuve una consulta.' }, createdAt: { S: seedDate3 } } } },
            ],
          },
        },
        physicalResourceId: cr.PhysicalResourceId.of('ReviewsSeed'),
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({ resources: [reviewsTable.tableArn] }),
    })

    // â”€â”€â”€ Secrets Manager â€” Stripe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // TODO: Stripe â€” actualizar manualmente en AWS Secrets Manager con secretKey y webhookSecret reales
    const stripeSecret = new secretsmanager.Secret(this, 'StripeSecret', {
      secretName: 'nexo/stripe',
      description: 'Stripe: secretKey y webhookSecret. Actualizar manualmente desde consola AWS.',
      secretStringValue: cdk.SecretValue.unsafePlainText(JSON.stringify({
        secretKey: 'PENDIENTE',
        webhookSecret: 'PENDIENTE',
      })),
    })

    // â”€â”€â”€ Secrets Manager â€” Resend â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const resendSecret = secretsmanager.Secret.fromSecretNameV2(
      this, 'ResendSecret', 'nexo/resend'
    )

    // â”€â”€â”€ Lambda â€” Email Service â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const emailLambda = new lambda.Function(this, 'NexoEmailLambda', {
      functionName: 'nexo-email-service',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      timeout: cdk.Duration.seconds(15),
      environment: {
        RESEND_SECRET_ARN: resendSecret.secretArn,
      },
      code: lambda.Code.fromInline(`
        const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager')
        const secrets = new SecretsManagerClient({})
        let cachedResendKey = null

        async function getResendApiKey() {
          if (cachedResendKey) return cachedResendKey
          const r = await secrets.send(new GetSecretValueCommand({ SecretId: process.env.RESEND_SECRET_ARN }))
          cachedResendKey = JSON.parse(r.SecretString).apiKey
          return cachedResendKey
        }

        const STATUS_CONFIG = {
          en_ruta:         { emoji: '\\u2708\\uFE0F',  titulo: '\\u00A1Tu pedido est\\u00E1 en camino!',               badge: 'EN RUTA',          color: '#00D4FF', mensaje: 'Tu paquete sali\\u00F3 de nuestras bodegas en Estados Unidos y est\\u00E1 en camino a Costa Rica. Te avisamos en cada paso del proceso.' },
          atascado_aduana: { emoji: '\\uD83D\\uDEC3',  titulo: 'Tu pedido est\\u00E1 en tr\\u00E1mite aduanero',        badge: 'EN ADUANA',        color: '#F59E0B', mensaje: 'Tu paquete lleg\\u00F3 a Costa Rica y est\\u00E1 siendo procesado por la Aduana. Este proceso puede tardar unos d\\u00EDas. Te avisamos en cuanto salga.' },
          bodega_cr:       { emoji: '\\uD83C\\uDFED',  titulo: '\\u00A1Tu pedido lleg\\u00F3 a nuestra bodega en CR!',  badge: 'BODEGA CR \\u00B7 PAGAR',        color: '#8B5CF6', mensaje: 'Tu paquete ya sali\\u00F3 de Aduana y est\\u00E1 en nuestra bodega en Costa Rica. Para que podamos despacharlo, realiz\\u00E1 el pago correspondiente desde tu cuenta.' },
          pendiente_pago:  { emoji: '\\uD83D\\uDCB3',  titulo: 'Ten\\u00E9s un saldo pendiente',                        badge: 'PAGO PENDIENTE',   color: '#EF4444', mensaje: 'Para continuar con la entrega hay un cobro pendiente. Ingres\\u00E1 a tu cuenta para ver el detalle y realizar el pago.' },
          pagado_en_ruta:  { emoji: '\\uD83D\\uDE9A',  titulo: '\\u00A1Pago recibido! Tu pedido est\\u00E1 en camino',  badge: 'PAGADO \\u2014 EN RUTA', color: '#10B981', mensaje: 'Confirmamos tu pago. Tu paquete est\\u00E1 listo para ser entregado. Te contactamos pronto para coordinar el horario.' },
          entregado:       { emoji: '\\uD83D\\uDCE6',  titulo: '\\u00A1Tu pedido fue entregado!',                       badge: 'ENTREGADO',        color: '#00D4FF', mensaje: '\\u00A1Tu paquete fue entregado! Gracias por confiar en nexo. Si quer\\u00E9s dejar una rese\\u00F1a, nos ayuda un mont\\u00F3n.' },
        }

        function buildEmailHtml(userName, trackingNumber, status, peso, totalBase, discountPct, totalFinal) {
          const cfg = STATUS_CONFIG[status]
          if (!cfg) return null
          const firstName = (userName || '').split(' ')[0] || 'cliente'
          const showPayCard = status === 'bodega_cr' && peso != null && totalFinal != null && totalFinal > 0
          const hasDiscount = showPayCard && discountPct > 0
          return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>'
            + '<body style="margin:0;padding:0;background:#F4F7FC;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">'
            + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7FC;padding:32px 16px;"><tr><td align="center">'
            + '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">'
            + '<tr><td style="background:#0A0E1A;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">'
            + '<div style="font-size:26px;font-weight:800;"><span style="color:#00D4FF;">nexo</span><span style="color:#fff;">courier</span></div>'
            + '<div style="color:#8899AA;font-size:12px;margin-top:4px;letter-spacing:1px;text-transform:uppercase;">USA \\u2192 Costa Rica</div>'
            + '</td></tr>'
            + '<tr><td style="background:#0A0E1A;padding:0 32px 24px;text-align:center;">'
            + '<span style="display:inline-block;background:' + cfg.color + '20;color:' + cfg.color + ';font-size:11px;font-weight:700;letter-spacing:1.5px;padding:6px 16px;border-radius:100px;border:1px solid ' + cfg.color + '40;">' + cfg.badge + '</span>'
            + '</td></tr>'
            + '<tr><td style="background:#fff;padding:36px 32px;">'
            + '<div style="text-align:center;margin-bottom:24px;">'
            + '<div style="font-size:48px;line-height:1;margin-bottom:16px;">' + cfg.emoji + '</div>'
            + '<h1 style="margin:0;color:#0A0E1A;font-size:22px;font-weight:700;line-height:1.3;">' + cfg.titulo + '</h1>'
            + '</div>'
            + '<p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 12px;">Hola <strong>' + firstName + '</strong>,</p>'
            + '<p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 24px;">' + cfg.mensaje + '</p>'
            + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7FC;border-radius:8px;margin-bottom:' + (showPayCard ? '16' : '28') + 'px;">'
            + '<tr><td style="padding:16px 20px;">'
            + '<div style="color:#6B7280;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">N\\u00FAmero de seguimiento</div>'
            + '<div style="color:#0A0E1A;font-size:18px;font-weight:700;font-family:Courier New,Courier,monospace;letter-spacing:1px;">' + trackingNumber + '</div>'
            + '</td></tr></table>'
            + (showPayCard
              ? '<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3FF;border:1px solid #8B5CF630;border-radius:8px;margin-bottom:28px;">'
                + '<tr><td style="padding:16px 20px;">'
                + '<table width="100%" cellpadding="0" cellspacing="0"><tr>'
                + '<td style="vertical-align:top;padding-right:16px;">'
                + '<div style="color:#7C3AED;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">Peso</div>'
                + '<div style="color:#0A0E1A;font-size:16px;font-weight:700;">' + peso + ' kg</div>'
                + '</td>'
                + '<td style="vertical-align:top;text-align:right;">'
                + '<div style="color:#7C3AED;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">Total a pagar</div>'
                + (hasDiscount ? '<div style="color:#9CA3AF;font-size:14px;font-weight:400;text-decoration:line-through;margin-bottom:2px;">$' + totalBase.toFixed(2) + '</div>' : '')
                + (hasDiscount ? '<div style="display:inline-block;background:#8B5CF620;color:#7C3AED;font-size:10px;font-weight:700;letter-spacing:1px;padding:2px 8px;border-radius:100px;border:1px solid #8B5CF640;margin-bottom:4px;">Nexo Fiel ' + discountPct + '%</div><br>' : '')
                + '<div style="color:#059669;font-size:20px;font-weight:800;">$' + totalFinal.toFixed(2) + '</div>'
                + '</td>'
                + '</tr></table>'
                + '</td></tr></table>'
              : '')
            + '<div style="text-align:center;">'
            + '<a href="https://www.nexocourier.com/pedidos" style="display:inline-block;background:#00D4FF;color:#0A0E1A;font-weight:700;font-size:14px;text-decoration:none;padding:14px 32px;border-radius:8px;">Ver mis pedidos \\u2192</a>'
            + '</div>'
            + '</td></tr>'
            + '<tr><td style="background:#0A0E1A;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;">'
            + '<p style="color:#4B5563;font-size:12px;margin:0 0 6px;">Notificaci\\u00F3n autom\\u00E1tica del pedido <strong style="color:#6B7280;">' + trackingNumber + '</strong></p>'
            + '<p style="margin:0;font-size:12px;"><span style="color:#00D4FF;font-weight:700;">nexo</span><span style="color:#6B7280;">courier</span> \\u00B7 <a href="https://www.nexocourier.com" style="color:#6B7280;text-decoration:none;">nexocourier.com</a></p>'
            + '</td></tr>'
            + '</table></td></tr></table>'
            + '</body></html>'
        }

        function buildWelcomeHtml(firstName) {
          return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>'
            + '<body style="margin:0;padding:0;background:#F4F7FC;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">'
            + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7FC;padding:32px 16px;"><tr><td align="center">'
            + '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">'
            + '<tr><td style="background:#0A0E1A;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">'
            + '<div style="font-size:26px;font-weight:800;"><span style="color:#00D4FF;">nexo</span><span style="color:#fff;">courier</span></div>'
            + '<div style="color:#8899AA;font-size:12px;margin-top:4px;letter-spacing:1px;text-transform:uppercase;">USA \\u2192 Costa Rica</div>'
            + '</td></tr>'
            + '<tr><td style="background:#0A0E1A;padding:0 32px 24px;text-align:center;">'
            + '<span style="display:inline-block;background:#00D4FF20;color:#00D4FF;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:6px 16px;border-radius:100px;border:1px solid #00D4FF40;">BIENVENID@</span>'
            + '</td></tr>'
            + '<tr><td style="background:#fff;padding:36px 32px;">'
            + '<div style="text-align:center;margin-bottom:24px;">'
            + '<div style="font-size:48px;line-height:1;margin-bottom:16px;">\\uD83C\\uDF1F</div>'
            + '<h1 style="margin:0;color:#0A0E1A;font-size:22px;font-weight:700;line-height:1.3;">\\u00A1Ya sos parte de nexo!</h1>'
            + '</div>'
            + '<p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 12px;">Hola <strong>' + firstName + '</strong>,</p>'
            + '<p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 24px;">Tu cuenta est\\u00E1 lista. Desde aqu\\u00ED pod\\u00E9s rastrear tus paquetes, ver el estado de tus pedidos y coordinar entregas \\u2014 todo en un solo lugar.</p>'
            + '<div style="text-align:center;">'
            + '<a href="https://www.nexocourier.com/cuenta" style="display:inline-block;background:#00D4FF;color:#0A0E1A;font-weight:700;font-size:14px;text-decoration:none;padding:14px 32px;border-radius:8px;">Ver mi cuenta \\u2192</a>'
            + '</div>'
            + '</td></tr>'
            + '<tr><td style="background:#0A0E1A;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;">'
            + '<p style="color:#4B5563;font-size:12px;margin:0 0 6px;">Recib\\u00EDs este mensaje porque acabas de crear tu cuenta en nexo Courier.</p>'
            + '<p style="margin:0;font-size:12px;"><span style="color:#00D4FF;font-weight:700;">nexo</span><span style="color:#6B7280;">courier</span> \\u00B7 <a href="https://www.nexocourier.com" style="color:#6B7280;text-decoration:none;">nexocourier.com</a></p>'
            + '</td></tr>'
            + '</table></td></tr></table>'
            + '</body></html>'
        }

        exports.handler = async (event) => {
          const { type, to, data } = event

          if (type === 'STATUS_CHANGE') {
            const { userName, trackingNumber, status } = data
            if (!to) {
              console.log(JSON.stringify({ event: 'EMAIL_SKIP', reason: 'no_email', trackingNumber, status }))
              return { success: false, reason: 'no_email' }
            }
            const html = buildEmailHtml(userName, trackingNumber, status, data.peso, data.totalBase, data.discountPct || 0, data.totalFinal)
            if (!html) {
              console.log(JSON.stringify({ event: 'EMAIL_SKIP', reason: 'unknown_status', status }))
              return { success: false, reason: 'unknown_status' }
            }
            const cfg = STATUS_CONFIG[status]
            const apiKey = await getResendApiKey()
            const res = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                from: 'nexo <notificaciones@nexocourier.com>',
                to: [to],
                subject: cfg.emoji + ' ' + cfg.titulo + ' \\u2014 Nexo Courier',
                html,
              }),
            })
            const result = await res.json()
            if (!res.ok) {
              console.error(JSON.stringify({ event: 'EMAIL_ERROR', status: res.status, error: result, to, trackingNumber }))
              return { success: false, error: result }
            }
            console.log(JSON.stringify({ event: 'EMAIL_SENT', emailId: result.id, to, trackingNumber, status }))
            return { success: true, emailId: result.id }
          }

          if (type === 'WELCOME') {
            const { userName } = data
            if (!to) return { success: false, reason: 'no_email' }
            const firstName = (userName || '').split(' ')[0] || 'cliente'
            const html = buildWelcomeHtml(firstName)
            const apiKey = await getResendApiKey()
            const res = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                from: 'nexo <notificaciones@nexocourier.com>',
                to: [to],
                subject: '\\u00A1Bienvenid@ a nexo Courier!',
                html,
              }),
            })
            const result = await res.json()
            if (!res.ok) {
              console.error(JSON.stringify({ event: 'EMAIL_ERROR', type: 'WELCOME', error: result, to }))
              return { success: false, error: result }
            }
            console.log(JSON.stringify({ event: 'EMAIL_SENT', type: 'WELCOME', emailId: result.id, to }))
            return { success: true, emailId: result.id }
          }

          console.warn(JSON.stringify({ event: 'EMAIL_UNKNOWN_TYPE', type }))
          return { success: false, reason: 'unknown_type' }
        }
      `),
    })

    resendSecret.grantRead(emailLambda)
    emailLambda.grantInvoke(ordersLambda)

    // â”€â”€â”€ Lambda â€” Cognito: PostConfirmation (email de bienvenida) â”€â”€â”€â”€
    const cognitoHooksLambda = new lambda.Function(this, 'NexoCognitoHooksLambda', {
      functionName: 'nexo-cognito-hooks',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      timeout: cdk.Duration.seconds(10),
      environment: {
        EMAIL_FUNCTION_NAME: 'nexo-email-service',
      },
      code: lambda.Code.fromInline(`
        const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda')
        const lambdaClient = new LambdaClient({})

        exports.handler = async (event) => {
          if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
            const { email, name, given_name } = event.request.userAttributes
            const userName = name || given_name || email.split('@')[0]
            try {
              await lambdaClient.send(new InvokeCommand({
                FunctionName: process.env.EMAIL_FUNCTION_NAME,
                InvocationType: 'Event',
                Payload: Buffer.from(JSON.stringify({
                  type: 'WELCOME',
                  to: email,
                  data: { userName },
                })),
              }))
            } catch (err) {
              console.error(JSON.stringify({ event: 'WELCOME_INVOKE_ERROR', error: err.message, email }))
            }
          }
          return event
        }
      `),
    })

    emailLambda.grantInvoke(cognitoHooksLambda)

    // â”€â”€â”€ Lambda â€” Cognito: CustomEmailSender (verificaciÃ³n y recovery via Resend) â”€â”€â”€â”€
    const customEmailSenderLambda = new NodejsFunction(this, 'NexoCustomEmailSenderLambda', {
      functionName: 'nexo-cognito-custom-email-sender',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'handler',
      timeout: cdk.Duration.seconds(10),
      entry: path.join(__dirname, 'lambdas/custom-email-sender/index.ts'),
      bundling: {
        externalModules: ['@aws-sdk/*'],
      },
      environment: {
        RESEND_SECRET_ARN: resendSecret.secretArn,
      },
    })

    emailSenderKey.grantDecrypt(customEmailSenderLambda)
    resendSecret.grantRead(customEmailSenderLambda)
    customEmailSenderLambda.addPermission('CognitoInvoke', {
      principal: new iam.ServicePrincipal('cognito-idp.amazonaws.com'),
    })

    // Wiring de triggers al User Pool
    userPool.addTrigger(cognito.UserPoolOperation.POST_CONFIRMATION, cognitoHooksLambda)

    // L1 escape hatch â€” customEmailSender no estÃ¡ expuesto en L2 de CDK
    const cfnPool = userPool.node.defaultChild as cognito.CfnUserPool
    cfnPool.addPropertyOverride('LambdaConfig.CustomEmailSender', {
      LambdaArn: customEmailSenderLambda.functionArn,
      LambdaVersion: 'V1_0',
    })
    cfnPool.addPropertyOverride('LambdaConfig.KMSKeyID', emailSenderKey.keyArn)

    // â”€â”€â”€ Lambda â€” Pagos: crear sesiÃ³n de cobro â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // TODO: Stripe â€” crear PaymentIntent y retornar URL de checkout (Payment Links o Checkout Session)
    const paymentCreateLambda = new lambda.Function(this, 'NexoPaymentCreateLambda', {
      functionName: 'nexo-payment-create',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
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
          return { statusCode: 503, headers, body: JSON.stringify({ error: 'Pagos no disponibles aÃºn.' }) }
        }
      `),
      environment: {
        CORS_ORIGINS: 'https://www.nexocourier.com,https://nexocourier.com,http://localhost:3000',
      },
      timeout: cdk.Duration.seconds(30),
    })

    ordersTable.grantReadData(paymentCreateLambda)
    stripeSecret.grantRead(paymentCreateLambda)

    // â”€â”€â”€ Lambda â€” Pagos: webhook de Stripe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // TODO: Stripe â€” validar firma con stripe.webhooks.constructEvent y actualizar pedido a pagado_en_ruta
    const paymentWebhookLambda = new lambda.Function(this, 'NexoPaymentWebhookLambda', {
      functionName: 'nexo-payment-webhook',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          return { statusCode: 200, body: JSON.stringify({ received: true }) }
        }
      `),
      environment: {
        ORDERS_TABLE: ordersTable.tableName,
        SECRET_ARN: stripeSecret.secretArn,
      },
      timeout: cdk.Duration.seconds(30),
    })

    ordersTable.grantReadWriteData(paymentWebhookLambda)
    stripeSecret.grantRead(paymentWebhookLambda)

    // â”€â”€â”€ API Gateway â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const api = new apigateway.RestApi(this, 'NexoAdminApi', {
      restApiName: 'nexo-admin-api',
      defaultCorsPreflightOptions: {
        allowOrigins: ['https://www.nexocourier.com', 'https://nexocourier.com', 'http://localhost:3000'],
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

    // Rutas /admin/users (sin auth por ahora â€” acceso interno)
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

    // Rutas /reviews â€” GET pÃºblico, POST con auth
    const reviewsIntegration = new apigateway.LambdaIntegration(reviewsLambda)
    const reviewsResource = api.root.addResource('reviews')
    reviewsResource.addMethod('GET', reviewsIntegration)
    reviewsResource.addMethod('POST', reviewsIntegration, authOptions)

    // Rutas /payments â€” crear sesiÃ³n (auth) y webhook (pÃºblico)
    const paymentsResource = api.root.addResource('payments')
    const paymentCreateResource = paymentsResource.addResource('create')
    const paymentWebhookResource = paymentsResource.addResource('webhook')
    paymentCreateResource.addMethod('POST', new apigateway.LambdaIntegration(paymentCreateLambda), authOptions)
    paymentWebhookResource.addMethod('POST', new apigateway.LambdaIntegration(paymentWebhookLambda))

    // Ruta /admin/reviews/{reviewId} â€” DELETE admin
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

    // â”€â”€â”€ Budget Alert â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

    // â”€â”€â”€ Outputs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    new cdk.CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId })
    new cdk.CfnOutput(this, 'UserPoolClientId', { value: userPoolClient.userPoolClientId })
    new cdk.CfnOutput(this, 'ApiUrl', { value: api.url })
    new cdk.CfnOutput(this, 'UsersTableName', { value: usersTable.tableName })
    new cdk.CfnOutput(this, 'OrdersTableName', { value: ordersTable.tableName })
  }
}
