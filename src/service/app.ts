import Koa from "koa";
import bodyParser from "koa-bodyparser";
import requestId from "koa-requestid";

import awilix, { aliasTo, asValue } from "awilix";

import { Plugin } from "./plugins/types";
import {
  errorHandlerMiddleware,
  initializeScopeMiddleware,
  unifiedResponseMiddleware,
} from "./api/middlewares";
import { IRouter } from "./api/interfaces";
import { ILogger } from "./modules/logger/interfaces";

export class App {
  app: Koa;
  port: number;
  container: awilix.AwilixContainer;
  plugins: Plugin[];
  routers: string[];
  logger: ILogger;

  constructor(dependencies: {
    port: number;
    routers: string[];
    container: awilix.AwilixContainer;
    plugins: Plugin[];
    logger: ILogger;
  }) {
    this.app = new Koa();
    this.port = dependencies.port;
    this.container = dependencies.container;
    this.plugins = dependencies.plugins;
    this.routers = dependencies.routers;
    this.routers = dependencies.routers;
    this.logger = dependencies.logger;
  }

  private async initializePlugins() {
    for (const plugin of this.plugins) {
      await plugin(this.container);
    }
  }

  private initializeMiddlewares() {
    this.app.use(requestId());
    this.app.use(initializeScopeMiddleware(this.container));
    this.app.use(unifiedResponseMiddleware);
    this.app.use(errorHandlerMiddleware);
    this.app.use(bodyParser());
  }

  private initializeRouters() {
    this.routers.forEach((routerName) => {
      if (this.container.has(routerName)) {
        const router: IRouter = this.container.resolve(routerName);
        this.app.use(router.middleware());
      }
    });
  }

  private registerLogger() {
    const applicationLogger = this.logger.child({
      loggerType: "application",
    });

    applicationLogger.info("Registration of Winston Logger");

    this.container.register({
      applicationLogger: asValue(applicationLogger),
      logger: aliasTo("applicationLogger"),
    });

    applicationLogger.info("Registration of Winston Logger completed!");
  }

  async start() {
    await this.app.listen(this.port);
    this.registerLogger();
    await this.initializePlugins();

    this.initializeMiddlewares();
    this.initializeRouters();

    const logger: ILogger = this.container.resolve("logger");

    logger.info(`App Ready in Port ${this.port}`);
  }
}
