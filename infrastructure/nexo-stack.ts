import * as cdk from 'aws-cdk-lib'
import * as cognito from 'aws-cdk-lib/aws-cognito'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as iam from 'aws-cdk-lib/aws-iam'
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

    // ─── DynamoDB ────────────────────────────────────────────────────
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

    // ─── Lambda — Admin CRUD ─────────────────────────────────────────
    const adminLambda = new lambda.Function(this, 'NexoAdminLambda', {
      functionName: 'nexo-admin-users',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const { CognitoIdentityProviderClient, ListUsersCommand, AdminGetUserCommand, AdminUpdateUserAttributesCommand, AdminDeleteUserCommand, AdminDisableUserCommand } = require('@aws-sdk/client-cognito-identity-provider')
        const { DynamoDBClient, GetItemCommand, UpdateItemCommand, DeleteItemCommand, ScanCommand } = require('@aws-sdk/client-dynamodb')

        const cognito = new CognitoIdentityProviderClient({})
        const dynamo = new DynamoDBClient({})
        const USER_POOL_ID = process.env.USER_POOL_ID
        const TABLE_NAME = process.env.TABLE_NAME

        exports.handler = async (event) => {
          const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
          const method = event.httpMethod
          const path = event.path
          const userId = event.pathParameters?.userId

          try {
            // GET /admin/users
            if (method === 'GET' && path === '/admin/users') {
              const result = await cognito.send(new ListUsersCommand({ UserPoolId: USER_POOL_ID, Limit: 60 }))
              return { statusCode: 200, headers, body: JSON.stringify(result.Users) }
            }

            // GET /admin/users/{userId}
            if (method === 'GET' && userId) {
              const result = await cognito.send(new AdminGetUserCommand({ UserPoolId: USER_POOL_ID, Username: userId }))
              return { statusCode: 200, headers, body: JSON.stringify(result) }
            }

            // PUT /admin/users/{userId}
            if (method === 'PUT' && userId) {
              const body = JSON.parse(event.body || '{}')
              const attrs = Object.entries(body).map(([Name, Value]) => ({ Name, Value: String(Value) }))
              await cognito.send(new AdminUpdateUserAttributesCommand({ UserPoolId: USER_POOL_ID, Username: userId, UserAttributes: attrs }))
              return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
            }

            // DELETE /admin/users/{userId}
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

    // Permisos Lambda → Cognito + DynamoDB
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

    // ─── API Gateway ─────────────────────────────────────────────────
    const api = new apigateway.RestApi(this, 'NexoAdminApi', {
      restApiName: 'nexo-admin-api',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: ['GET', 'PUT', 'DELETE', 'OPTIONS'],
      },
    })

    const adminResource = api.root.addResource('admin')
    const usersResource = adminResource.addResource('users')
    const userResource = usersResource.addResource('{userId}')

    const integration = new apigateway.LambdaIntegration(adminLambda)
    usersResource.addMethod('GET', integration)
    userResource.addMethod('GET', integration)
    userResource.addMethod('PUT', integration)
    userResource.addMethod('DELETE', integration)

    // ─── Outputs ─────────────────────────────────────────────────────
    new cdk.CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId })
    new cdk.CfnOutput(this, 'UserPoolClientId', { value: userPoolClient.userPoolClientId })
    new cdk.CfnOutput(this, 'ApiUrl', { value: api.url })
    new cdk.CfnOutput(this, 'UsersTableName', { value: usersTable.tableName })
  }
}
