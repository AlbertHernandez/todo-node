import 'reflect-metadata';
import * as Awilix from 'awilix';

import { App } from '@server/app';
import { env, envSchema } from '@server/config/environment';
import { applicationLoggerFactory } from '@modules/logger';
import { applicationRouters } from '@application/application-routers';
import { applicationErrorHandlerFactory } from '@modules/error-handler';
import { appDependencies } from '@application/register-application-dependencies';
import {
  AppDependenciesPlugin,
  MongoPlugin,
  SentryPlugin,
  ValidationPlugin,
} from '@server/plugins';
import {
  AuthenticationMiddleware,
  BodyParserMiddleware,
  ConfigureSentryScopeMiddleware,
  ErrorHandlerMiddleware,
  HelmetMiddleware,
  InitializeScopeMiddleware,
  LogRequestMiddleware,
  NotFoundErrorMiddleware,
  RateLimitMiddleware,
  RequestIdMiddleware,
  UnifiedResponseMiddleware,
} from './server/api/middlewares/app-middlewares';

export const start = async (): Promise<void> => {
  const app = new App({
    port: env.port,
    plugins: [
      new ValidationPlugin({
        identifier: 'Environment variables',
        schema: envSchema,
        config: process.env,
      }),
      new SentryPlugin({
        enabled: env.sentry.isEnabled,
        dsn: env.sentry.dns,
        environment: env.environment,
        serverName: 'Todo Service',
        tracesSampleRate: 1.0,
      }),
      new MongoPlugin({
        url: env.mongo.url,
      }),
      new AppDependenciesPlugin({
        appDependencies,
      }),
    ],
    container: Awilix.createContainer(),
    routers: applicationRouters,
    applicationLoggerFactory,
    applicationErrorHandlerFactory,
    middlewares: [
      new ErrorHandlerMiddleware(),
      new HelmetMiddleware(),
      new BodyParserMiddleware(),
      new RequestIdMiddleware(),
      new AuthenticationMiddleware(),
      new InitializeScopeMiddleware(),
      new ConfigureSentryScopeMiddleware(),
      new LogRequestMiddleware(),
      new UnifiedResponseMiddleware(),
      new RateLimitMiddleware({
        db: new Map(),
        driver: 'memory',
        duration: 10 * 60 * 1000,
        max: 100,
        whitelist: () => {
          return env.development || env.test;
        },
      }),
      new NotFoundErrorMiddleware(),
    ],
    env,
  });

  await app.start();
};

start();
