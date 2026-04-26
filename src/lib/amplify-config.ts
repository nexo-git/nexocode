import { Amplify } from 'aws-amplify'

// These values are populated after CDK deploy
// Replace with real values from CDK outputs
const config = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '',
      loginWith: { email: true },
    },
  },
}

export function configureAmplify() {
  Amplify.configure(config)
}
