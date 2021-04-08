import * as Awilix from "awilix";

import { App } from "./app";
import { env } from "../config/environment";
import { registerDependenciesPlugin } from "./plugins";
import { applicationLogger } from "./modules/logger";
import {
  bodyParserMiddleware,
  logRequestMiddleware,
  unifiedResponseMiddleware,
  errorHandlerMiddleware,
  helmetMiddleware,
  initializeScopeMiddleware,
  ratelimitMiddleware,
  requestIdMiddleware,
} from "./api/middlewares";
import { todosRouterConfig } from "./application/todos";

const start = async () => {
  const app = new App({
    port: env.port,
    plugins: [registerDependenciesPlugin],
    container: Awilix.createContainer(),
    routerConfigs: [todosRouterConfig],
    applicationLogger,
    middlewares: [
      helmetMiddleware,
      ratelimitMiddleware,
      requestIdMiddleware,
      initializeScopeMiddleware,
      unifiedResponseMiddleware,
      logRequestMiddleware,
      errorHandlerMiddleware,
      bodyParserMiddleware,
    ],
    env,
  });

  await app.start();
};

start();
