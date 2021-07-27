import Koa from 'koa';
import * as Awilix from 'awilix';
import { Server } from 'http';

import { Plugin } from 'src/server/plugins/interfaces/plugin-interface';
import { ApplicationLoggerFactory } from 'src/server/modules/logger/interfaces';
import Router from 'koa-router';
import { App as IApp } from './interfaces';
import { ApplicationErrorHandlerFactory } from 'src/server/modules/error-handler/interfaces';
import { Middleware } from 'src/server/api/middlewares/interfaces/middleware-interface';

export class App implements IApp {
  app: Koa;
  port;
  container: Awilix.AwilixContainer;
  logger;
  errorHandler;
  private server: Server | undefined;
  private plugins: Plugin[];
  private readonly routers: Router[];
  private middlewares: Middleware[];

  constructor(dependencies: {
    app?: Koa;
    port: number;
    routers?: Router[];
    container?: Awilix.AwilixContainer;
    applicationLoggerFactory: ApplicationLoggerFactory;
    applicationErrorHandlerFactory: ApplicationErrorHandlerFactory;
  }) {
    this.app = dependencies.app ?? new Koa();
    this.port = dependencies.port;
    this.container = dependencies.container ?? Awilix.createContainer();

    this.plugins = [];
    this.middlewares = [];

    this.routers = dependencies.routers ?? [];

    this.logger = dependencies.applicationLoggerFactory.get(this);
    this.errorHandler = dependencies.applicationErrorHandlerFactory.get(this);
  }

  public usePlugins(...plugins: Plugin[]): void {
    this.plugins.push(...plugins);
  }

  public useMiddlewares(...middlewares: Middleware[]): void {
    this.middlewares.push(...middlewares);
  }

  private async initializePlugins(): Promise<void> {
    this.logger.trace('Initializing plugins...');

    for (const plugin of this.plugins) {
      await plugin.use(this);
    }
    this.logger.trace('Plugins ready!');
  }

  private initializeMiddlewares(): void {
    this.logger.trace('Initializing middlewares...');

    for (const middleware of this.middlewares) {
      this.app.use((ctx: Koa.Context, next: Koa.Next) => {
        if (middleware.setApp) {
          middleware.setApp(this);
        }
        return middleware.use(ctx, next);
      });
    }

    this.logger.trace('Middlewares ready!');
  }

  private initializeRouters(): void {
    this.logger.trace('Initializing Routers...');

    this.routers.forEach((router) => {
      this.app.use(router.middleware());
    });

    this.logger.trace('Routers ready!');
  }

  private async listen(): Promise<void> {
    this.server = await this.app.listen(this.port);

    this.logger.trace(`Application Listening in Port ${this.port}`);
  }

  async start(): Promise<void> {
    this.logger.trace('Starting the application...');

    await this.initializePlugins();
    this.initializeMiddlewares();
    this.initializeRouters();

    await this.listen();

    this.logger.info('Application Ready to be Used!');
  }

  close() {
    if (this.server) {
      this.server.close();
    }
  }
}
