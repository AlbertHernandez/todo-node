import Koa from "koa";
import awilix, { aliasTo, asValue } from "awilix";

import { Plugin } from "./plugins/types";
import { ILogger } from "./modules/logger/interfaces";
import { ApplicationLogger } from "./modules/logger/types";
import { Middleware } from "./api/types";
import Router from "koa-router";
import { IApp } from "./interfaces";
import { IErrorHandler } from "../application/errors/interfaces";
import { ApplicationErrorHandler } from "./modules/error-handler/types";

export class App implements IApp {
  app: Koa;
  port: number;
  container: awilix.AwilixContainer;
  logger: ILogger;
  errorHandler: IErrorHandler;
  env?: any;
  private plugins: Plugin[];
  private routers: Router[];
  private middlewares: Middleware[];

  constructor(dependencies: {
    port: number;
    routers?: Router[];
    container: awilix.AwilixContainer;
    plugins?: Plugin[];
    applicationLogger: ApplicationLogger;
    applicationErrorHandler: ApplicationErrorHandler;
    middlewares?: Middleware[];
    env?: any;
  }) {
    this.app = new Koa();
    this.port = dependencies.port;
    this.container = dependencies.container;
    this.plugins = dependencies.plugins || [];
    this.routers = dependencies.routers || [];

    this.middlewares = dependencies.middlewares || [];
    this.env = dependencies.env;

    this.logger = dependencies.applicationLogger.createLogger(this);
    this.errorHandler = dependencies.applicationErrorHandler.createErrorHandler(
      this
    );
  }

  private async initializePlugins() {
    this.logger.info("Initializing plugins...");

    for (const plugin of this.plugins) {
      await plugin(this);
    }
    this.logger.info("Plugins ready!");
  }

  private initializeMiddlewares() {
    this.logger.info("Initializing middlewares...");

    for (const middleware of this.middlewares) {
      this.app.use(middleware(this));
    }

    this.logger.info("Middlewares ready!");
  }

  private initializeRouters() {
    this.logger.info("Initializing Routers...");

    this.routers.forEach((router) => {
      this.app.use(router.middleware());
    });

    this.logger.info("Routers ready!");
  }

  private registerLogger() {
    const applicationLogger = this.logger.child({
      loggerType: "application",
    });

    applicationLogger.info("Registration of Application Logger...");

    this.container.register({
      applicationLogger: asValue(applicationLogger),
      logger: aliasTo("applicationLogger"),
    });

    applicationLogger.info("Registration of Application Logger completed!");
  }

  private registerErrorHandler() {
    const applicationLogger = this.logger.child({
      loggerType: "application",
    });

    applicationLogger.info("Registration of Application Error Handler...");

    this.container.register({
      errorHandler: asValue(this.errorHandler),
    });

    applicationLogger.info(
      "Registration of Application Error Handler completed!"
    );
  }

  private registerEnv() {
    this.logger.info("Registration of application Env...");

    if (!this.env) {
      this.logger.info("No Env to register");
      return;
    }

    this.container.register({
      env: asValue(this.env),
    });

    this.logger.info("Registration of application Env!");
  }

  private registerApp() {
    this.logger.info("Registration of application...");

    this.container.register({
      app: asValue(this),
    });

    this.logger.info("Registration of application completed!");
  }

  private async listen() {
    await this.app.listen(this.port);
    this.logger.info(`Application Listening in Port ${this.port}`);
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
    this.logger.info("Starting the application...");

    await this.listen();

    this.registerLogger();
    this.registerErrorHandler();

    this.registerEnv();

    await this.initializePlugins();

    this.initializeMiddlewares();
    this.initializeRouters();

    this.registerApp();

    this.subscribeToErrors();

    this.logger.info("Application Ready to be Used!");
  }
}
