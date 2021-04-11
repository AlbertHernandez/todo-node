import Koa from "koa";
import * as Awilix from "awilix";

import { Plugin } from "./plugins/interfaces";
import { ApplicationLogger, Logger } from "./modules/logger/interfaces";
import Router from "koa-router";
import { App as IApp } from "./interfaces";
import {
  ApplicationErrorHandler,
  ErrorHandler,
} from "./modules/error-handler/interfaces";
import { AppMiddleware } from "./api/middlewares/app-middlewares/interfaces";

export class App implements IApp {
  app: Koa;
  port: number;
  container: Awilix.AwilixContainer;
  logger: Logger;
  errorHandler: ErrorHandler;
  env: any;
  private plugins: Plugin[];
  private routers: Router[];
  private middlewares: AppMiddleware[];

  constructor(dependencies: {
    port: number;
    routers?: Router[];
    container: Awilix.AwilixContainer;
    plugins?: Plugin[];
    applicationLogger: ApplicationLogger;
    applicationErrorHandler: ApplicationErrorHandler;
    middlewares?: AppMiddleware[];
    env: any;
  }) {
    this.app = new Koa();
    this.port = dependencies.port;
    this.container = dependencies.container;
    this.plugins = dependencies.plugins || [];
    this.routers = dependencies.routers || [];

    this.middlewares = dependencies.middlewares || [];
    this.env = dependencies.env || {};

    this.logger = dependencies.applicationLogger.createLogger(this);
    this.errorHandler = dependencies.applicationErrorHandler.createErrorHandler(
      this
    );
  }

  private async initializePlugins() {
    this.logger.debug("Initializing plugins...");

    for (const plugin of this.plugins) {
      await plugin(this);
    }
    this.logger.debug("Plugins ready!");
  }

  private initializeMiddlewares() {
    this.logger.debug("Initializing middlewares...");

    for (const middleware of this.middlewares) {
      this.app.use(middleware(this));
    }

    this.logger.debug("Middlewares ready!");
  }

  private initializeRouters() {
    this.logger.debug("Initializing Routers...");

    this.routers.forEach((router) => {
      this.app.use(router.middleware());
    });

    this.logger.debug("Routers ready!");
  }

  private registerLogger() {
    const applicationLogger = this.logger.child({
      loggerType: "application",
    });

    applicationLogger.debug("Registration of Application Logger...");

    this.container.register({
      applicationLogger: Awilix.asValue(applicationLogger),
      logger: Awilix.aliasTo("applicationLogger"),
    });

    applicationLogger.debug("Registration of Application Logger completed!");
  }

  private registerErrorHandler() {
    const applicationLogger = this.logger.child({
      loggerType: "application",
    });

    applicationLogger.debug("Registration of Application Error Handler...");

    this.container.register({
      errorHandler: Awilix.asValue(this.errorHandler),
    });

    applicationLogger.debug(
      "Registration of Application Error Handler completed!"
    );
  }

  private registerApp() {
    this.logger.debug("Registration of application...");

    this.container.register({
      app: Awilix.asValue(this),
    });

    this.logger.debug("Registration of application completed!");
  }

  private async listen() {
    await this.app.listen(this.port);
    this.logger.debug(`Application Listening in Port ${this.port}`);
  }

  private subscribeToErrors() {
    process.on("unhandledRejection", (reason: Error) => {
      throw reason;
    });

    process.on("uncaughtException", (error: Error) => {
      this.errorHandler.handleError(error);
      if (!this.errorHandler.isTrustedError(error)) {
        process.exit(1);
      }
    });
  }

  async start() {
    this.logger.debug("Starting the application...");

    await this.listen();

    this.registerLogger();
    this.registerErrorHandler();

    await this.initializePlugins();

    this.initializeMiddlewares();
    this.initializeRouters();

    this.registerApp();

    this.subscribeToErrors();

    this.logger.info("Application Ready to be Used!");
  }
}
