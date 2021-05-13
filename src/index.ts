import * as Awilix from 'awilix'

import { App } from '@server/app'
import { env } from '@server/config/environment'
import { registerApplicationDependencies } from '@application/register-application-dependencies'
import { applicationLoggerFactory } from '@modules/logger'
import * as appMiddlewares from './server/api/middlewares/app-middlewares'
import { applicationRouters } from '@application/application-routers'
import { applicationErrorHandlerFactory } from '@modules/error-handler'
import { sentryPlugin } from '@plugins/sentry-plugin'
import { mongoPlugin } from '@plugins/mongo-plugin'

export const start = async (): Promise<void> => {
  const app = new App({
    port: env.port,
    plugins: [
      sentryPlugin,
      mongoPlugin,
      registerApplicationDependencies
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
