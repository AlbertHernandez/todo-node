import Koa from "koa";
import awilix, { aliasTo, asValue } from "awilix";

import { Plugin } from "./plugins/types";
import { ILogger } from "./modules/logger/interfaces";
import { ApplicationLogger } from "./modules/logger/types";
import { Middleware } from "./api/types";
import KoaRouter from "koa-router";

export class App {
  app: Koa;
  port: number;
  container: awilix.AwilixContainer;
  plugins: Plugin[];
  routers: KoaRouter[];
  logger: ILogger;
  middlewares: Middleware[];
  env: any;

  constructor(dependencies: {
    port: number;
    routers?: KoaRouter[];
    container: awilix.AwilixContainer;
    plugins?: Plugin[];
    applicationLogger: ApplicationLogger;
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

    this.logger = dependencies.applicationLogger.createLogger({
      env: this.env,
    });
  }

  private async initializePlugins() {
    this.logger.info("Initializing plugins...");

    for (const plugin of this.plugins) {
      await plugin(this.container);
    }
    this.logger.info("Plugins ready!");
  }

  private initializeMiddlewares() {
    this.logger.info("Initializing middlewares...");

    for (const middleware of this.middlewares) {
      this.app.use(middleware(this.container));
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

  async listen() {
    await this.app.listen(this.port);
    this.logger.info(`Application Listening in Port ${this.port}`);
  }

  async start() {
    this.logger.info("Starting the application...");

    await this.listen();

    this.registerLogger();

    this.registerEnv();

    await this.initializePlugins();

    this.initializeMiddlewares();
    this.initializeRouters();

    this.logger.info("Application Ready to be Used!");
  }
}
