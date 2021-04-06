import Koa from "koa";
import bodyParser from "koa-bodyparser";
import requestId from "koa-requestid";

import awilix from "awilix";

import { Plugin } from "./plugins/types";
import {
  errorHandlerMiddleware,
  initializeScopeMiddleware,
  unifiedResponseMiddleware,
} from "./api/middlewares";
import { IRouter } from "./api/interfaces";

export class App {
  app: Koa;
  port: number;
  container: awilix.AwilixContainer;
  plugins: Plugin[];
  routers: string[];

  constructor(dependencies: {
    port: number;
    routers: string[];
    container: awilix.AwilixContainer;
    plugins: Plugin[];
  }) {
    this.app = new Koa();
    this.port = dependencies.port;
    this.container = dependencies.container;
    this.plugins = dependencies.plugins;
    this.routers = dependencies.routers;
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

  async start() {
    await this.app.listen(this.port);
    await this.initializePlugins();

    this.initializeMiddlewares();
    this.initializeRouters();
    console.log(`App Ready in Port ${this.port}`);
  }
}
