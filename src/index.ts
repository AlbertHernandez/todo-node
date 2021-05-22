import 'reflect-metadata'
import * as Awilix from 'awilix'

import { App } from '@server/app'
import { env, envSchema } from '@server/config/environment'
import { applicationLoggerFactory } from '@modules/logger'
import * as appMiddlewares from './server/api/middlewares/app-middlewares'
import { applicationRouters } from '@application/application-routers'
import { applicationErrorHandlerFactory } from '@modules/error-handler'
import { appDependencies } from '@application/register-application-dependencies'
import {
  AppDependenciesPlugin,
  MongoPlugin,
  SentryPlugin,
  ValidationPlugin
} from '@server/plugins'

export const start = async (): Promise<void> => {
  const app = new App({
    port: env.port,
    plugins: [
      new ValidationPlugin({
        identifier: 'Environment variables',
        schema: envSchema,
        config: process.env
      }),
      new SentryPlugin({
        enabled: env.sentry.isEnabled,
        dsn: env.sentry.dns,
        environment: env.environment,
        serverName: 'Todo Service',
        tracesSampleRate: 1.0
      }),
      new MongoPlugin({
        url: env.mongo.url
      }),
      new AppDependenciesPlugin({
        appDependencies
      })
    ],
    container: Awilix.createContainer(),
    routers: applicationRouters,
    applicationLoggerFactory,
    applicationErrorHandlerFactory,
    middlewares: [
      appMiddlewares.errorHandlerMiddleware,
      appMiddlewares.helmetMiddleware,
      appMiddlewares.bodyParserMiddleware,
      appMiddlewares.requestIdMiddleware,
      appMiddlewares.authenticationMiddleware,
      appMiddlewares.initializeScopeMiddleware,
      appMiddlewares.configureSentryScopeMiddleware,
      appMiddlewares.logRequestMiddleware,
      appMiddlewares.unifiedResponseMiddleware,
      appMiddlewares.ratelimitMiddleware,
      appMiddlewares.notFoundErrorMiddleware
    ],
    env
  })

  await app.start()
}

// eslint-disable-next-line no-void
void start()
