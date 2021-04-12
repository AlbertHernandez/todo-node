import * as Awilix from "awilix";

import { App } from "./server/app";
import { env } from "./server/config/environment";
import { registerApplicationDependencies } from "./application/register-application-dependencies";
import { applicationLogger } from "./server/modules/logger";
import * as appMiddlewares from "./server/api/middlewares/app-middlewares";
import { applicationRouters } from "./application/application-routers";
import { applicationErrorHandler } from "./server/modules/error-handler";

const start = async () => {
  const app = new App({
    port: env.port,
    plugins: [registerApplicationDependencies],
    container: Awilix.createContainer(),
    routers: applicationRouters,
    applicationLogger,
    applicationErrorHandler,
    middlewares: [
      appMiddlewares.errorHandlerMiddleware,
      appMiddlewares.bodyParserMiddleware,
      appMiddlewares.helmetMiddleware,
      appMiddlewares.ratelimitMiddleware,
      appMiddlewares.authenticationMiddleware,
      appMiddlewares.requestIdMiddleware,
      appMiddlewares.initializeScopeMiddleware,
      appMiddlewares.unifiedResponseMiddleware,
      appMiddlewares.logRequestMiddleware,
    ],
    env,
  });

  await app.start();
};

start();
