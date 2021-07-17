import 'reflect-metadata';

import { App } from '@server/app';
import { env, envSchema } from '@server/config/environment';
import { applicationLoggerFactory } from '@modules/logger';
import { applicationRouters } from '@application/application-routers';
import { applicationErrorHandlerFactory } from '@modules/error-handler';
import { appDependencies } from '@application/register-application-dependencies';
import {
  AppDependenciesPlugin,
  MessageClientPlugin,
  MongoPlugin,
  RegisterAppPlugin,
  RegisterEnvPlugin,
  RegisterErrorHandlerPlugin,
  RegisterLoggerPlugin,
  SentryPlugin,
  SubscribeErrorPlugin,
  ValidationPlugin,
  MessageListenerClientPlugin,
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
import { UserName } from '@server/api/constants/user-name-constant';
import { UserType } from '@server/api/constants/user-type-constant';
import { messageListenerClientConfig } from './message-listener-client-config';

export const start = async (): Promise<void> => {
  const app = new App({
    port: env.port,
    routers: applicationRouters,
    applicationLoggerFactory,
    applicationErrorHandlerFactory,
  });

  app.usePlugins(
    new ValidationPlugin({
      identifier: 'Environment variables',
      schema: envSchema,
      config: process.env,
    }),
    new RegisterEnvPlugin({
      env,
    }),
    new RegisterLoggerPlugin(),
    new RegisterErrorHandlerPlugin(),
    new SubscribeErrorPlugin(),
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
    new MessageClientPlugin({
      projectId: env.messageClient.projectId,
    }),
    new AppDependenciesPlugin({
      appDependencies,
    }),
    new RegisterAppPlugin(),
    new MessageListenerClientPlugin({
      messageListenerClientConfig,
      enabled: env.messageListenerClient.enabled,
    }),
  );

  app.useMiddlewares(
    new ErrorHandlerMiddleware(),
    new HelmetMiddleware(),
    new BodyParserMiddleware(),
    new RequestIdMiddleware(),
    new AuthenticationMiddleware({
      apiUsers: [
        {
          key: env.apiKey,
          name: UserName.GenericApiUser,
          type: UserType.Api,
        },
      ],
    }),
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
  );

  await app.start();
};

start();
