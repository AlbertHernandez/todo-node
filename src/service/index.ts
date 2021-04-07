import * as Awilix from "awilix";

import { App } from "./app";
import { port } from "../config/environment";
import { registerDependenciesPlugin } from "./plugins";
import logger from "./modules/logger";
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

const start = async () => {
  const app = new App({
    port,
    plugins: [registerDependenciesPlugin],
    container: Awilix.createContainer(),
    routerNames: ["todosRouter"],
    logger,
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
  });

  await app.start();
};

start();
