import * as Awilix from "awilix";

import { App } from "./server/app";
import { env } from "./server/config/environment";
import { registerApplicationDependencies } from "./application/register-application-dependencies";
import { applicationLogger } from "./server/modules/logger";
import {
  bodyParserMiddleware,
  logRequestMiddleware,
  unifiedResponseMiddleware,
  errorHandlerMiddleware,
  helmetMiddleware,
  initializeScopeMiddleware,
  ratelimitMiddleware,
  requestIdMiddleware,
} from "./server/api/middlewares";
import { applicationRouters } from "./application/application-routers";

const start = async () => {
  const app = new App({
    port: env.port,
    plugins: [registerApplicationDependencies],
    container: Awilix.createContainer(),
    routers: applicationRouters,
    applicationLogger,
    middlewares: [
      bodyParserMiddleware,
      helmetMiddleware,
      ratelimitMiddleware,
      requestIdMiddleware,
      initializeScopeMiddleware,
      unifiedResponseMiddleware,
      logRequestMiddleware,
      errorHandlerMiddleware,
    ],
    env,
  });

  await app.start();
};

start();
