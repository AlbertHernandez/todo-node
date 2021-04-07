import Koa from "koa";
import awilix, { aliasTo, asValue, Constructor } from "awilix";

import { Plugin } from "./plugins/types";
import { ILogger } from "./modules/logger/interfaces";
import { ApplicationLogger } from "./modules/logger/types";
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
  env: any;

  constructor(dependencies: {
    port: number;
    routerNames?: string[];
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
    this.routerNames = dependencies.routerNames || [];

    this.middlewares = dependencies.middlewares || [];
    this.env = dependencies.env;

    this.logger = dependencies.applicationLogger.createLogger({
      env: this.env,
    });
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

    applicationLogger.info("Registration of application Logger...");

    this.container.register({
      applicationLogger: asValue(applicationLogger),
      logger: aliasTo("applicationLogger"),
    });

    applicationLogger.info("Registration of application completed!");
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

  async start() {
    await this.app.listen(this.port);

    this.registerLogger();
    this.registerEnv();
    await this.initializePlugins();

    this.initializeMiddlewares();
    this.initializeRouters();

    const logger: ILogger = this.container.resolve("logger");

    logger.info(`App Ready in Port ${this.port}`);
  }
}
