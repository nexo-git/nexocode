import * as cdk from 'aws-cdk-lib'
import * as cognito from 'aws-cdk-lib/aws-cognito'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as budgets from 'aws-cdk-lib/aws-budgets'
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
