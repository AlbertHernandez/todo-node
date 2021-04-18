import * as Awilix from "awilix";

import { App } from "./server/app";
import { env } from "./server/config/environment";
import { registerApplicationDependencies } from "./application/register-application-dependencies";
import { applicationLoggerFactory } from "./server/modules/logger";
import * as appMiddlewares from "./server/api/middlewares/app-middlewares";
import { applicationRouters } from "./application/application-routers";
import { applicationErrorHandlerFactory } from "./server/modules/error-handler";
import * as plugins from "./server/plugins";

export const start = async () => {
  const app = new App({
    port: env.port,
    plugins: [
      plugins.sentryPlugin,
      plugins.mongoPlugin,
      registerApplicationDependencies,
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
      appMiddlewares.initializeErrorTrackerScopeMiddleware,
      appMiddlewares.logRequestMiddleware,
      appMiddlewares.unifiedResponseMiddleware,
      appMiddlewares.ratelimitMiddleware,
      appMiddlewares.notFoundErrorMiddleware,
    ],
    env,
  });

  await app.start();
};

start();
