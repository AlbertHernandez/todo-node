import Koa from "koa";
import bodyParser from "koa-bodyparser";
import requestId from "koa-requestid";
import helmet from "koa-helmet";
import ratelimit from "koa-ratelimit";

import awilix, { aliasTo, asValue } from "awilix";

import { Plugin } from "./plugins/types";
import {
  errorHandlerMiddleware,
  initializeScopeMiddleware,
  logRequestMiddleware,
  unifiedResponseMiddleware,
} from "./api/middlewares";
import { ILogger } from "./modules/logger/interfaces";
import { IApplicationRouter } from "./application/interfaces";
import { env } from "../config/environment";

export class App {
  app: Koa;
  port: number;
  container: awilix.AwilixContainer;
  plugins: Plugin[];
  routerNames: string[];
  logger: ILogger;

  constructor(dependencies: {
    port: number;
    routerNames: string[];
    container: awilix.AwilixContainer;
    plugins: Plugin[];
    logger: ILogger;
  }) {
    this.app = new Koa();
    this.port = dependencies.port;
    this.container = dependencies.container;
    this.plugins = dependencies.plugins;
    this.routerNames = dependencies.routerNames;
    this.logger = dependencies.logger;
  }

  private async initializePlugins() {
    for (const plugin of this.plugins) {
      await plugin(this.container);
    }
  }

  private initializeMiddlewares() {
    const db = new Map();
    this.app.use(
      ratelimit({
        driver: "memory",
        db: db,
        id: (ctx: Koa.Context) => ctx.ip,
        max: 100,
        duration: 600000, // 10 min
        disableHeader: false,
        whitelist: () => {
          return env.development || env.test;
        },
      })
    );

    this.app.use(helmet());
    this.app.use(requestId());
    this.app.use(initializeScopeMiddleware(this.container));
    this.app.use(unifiedResponseMiddleware);
    this.app.use(logRequestMiddleware);
    this.app.use(errorHandlerMiddleware);
    this.app.use(bodyParser());
  }

  private initializeRouters() {
    this.routerNames.forEach((routerName) => {
      if (this.container.has(routerName)) {
        const applicationRouter: IApplicationRouter = this.container.resolve(
          routerName
        );
        this.app.use(applicationRouter.use());
      }
    });
  }

  private registerLogger() {
    const applicationLogger = this.logger.child({
      loggerType: "application",
    });

    applicationLogger.info("Registration of Winston Logger...");

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
