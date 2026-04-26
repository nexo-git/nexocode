#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { NexoStack } from './nexo-stack'

const app = new cdk.App()

new NexoStack(app, 'NexoStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1',
  },
  description: 'nexo — Cognito + DynamoDB + Admin API',
})
