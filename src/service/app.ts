import Koa from "koa";
import awilix, { aliasTo, asValue } from "awilix";

import { Plugin } from "./plugins/types";
import { ILogger } from "./modules/logger/interfaces";
import { IApplicationRouter } from "./application/interfaces";
import { Middleware } from "./api/types";

export class App {
  app: Koa;
  port: number;
  container: awilix.AwilixContainer;
  plugins: Plugin[];
  routerNames: string[];
  logger: ILogger;
  middlewares: Middleware[];

  constructor(dependencies: {
    port: number;
    routerNames?: string[];
    container: awilix.AwilixContainer;
    plugins?: Plugin[];
    logger: ILogger;
    middlewares?: Middleware[];
  }) {
    this.app = new Koa();
    this.port = dependencies.port;
    this.container = dependencies.container;
    this.plugins = dependencies.plugins || [];
    this.routerNames = dependencies.routerNames || [];
    this.logger = dependencies.logger;
    this.middlewares = dependencies.middlewares || [];
  }

  private async initializePlugins() {
    for (const plugin of this.plugins) {
      await plugin(this.container);
    }
  }

  private initializeMiddlewares() {
    for (const middleware of this.middlewares) {
      this.app.use(middleware(this.container));
    }
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
