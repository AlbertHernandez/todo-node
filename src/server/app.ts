import Koa from 'koa';
import * as Awilix from 'awilix';

import { Plugin } from '@plugins/interfaces/plugin-interface';
import { ApplicationLoggerFactory } from '@modules/logger/interfaces';
import Router from 'koa-router';
import { App as IApp } from './interfaces';
import { AppMiddleware } from '@middlewares/app-middlewares/interfaces';
import { ApplicationErrorHandlerFactory } from '@modules/error-handler/interfaces';

export class App implements IApp {
  app: Koa;
  port;
  container;
  logger;
  errorHandler;
  env: any;
  private readonly plugins: Plugin[];
  private readonly routers: Router[];
  private readonly middlewares: AppMiddleware[];

  constructor(dependencies: {
    port: number;
    routers?: Router[];
    container: Awilix.AwilixContainer;
    plugins?: Plugin[];
    applicationLoggerFactory: ApplicationLoggerFactory;
    applicationErrorHandlerFactory: ApplicationErrorHandlerFactory;
    middlewares?: AppMiddleware[];
    env: any;
  }) {
    this.app = new Koa();
    this.port = dependencies.port;
    this.container = dependencies.container;
    this.plugins = dependencies.plugins ?? [];
    this.routers = dependencies.routers ?? [];

    this.middlewares = dependencies.middlewares ?? [];
    this.env = dependencies.env ?? {};

    this.logger = dependencies.applicationLoggerFactory.get(this);
    this.errorHandler = dependencies.applicationErrorHandlerFactory.get(this);
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
      this.app.use(middleware(this));
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

  private registerLogger(): void {
    const applicationLogger = this.logger.child({
      loggerType: 'application',
    });

    applicationLogger.trace('Registration of Application Logger...');

    this.container.register({
      applicationLogger: Awilix.asValue(applicationLogger),
      logger: Awilix.aliasTo('applicationLogger'),
    });

    applicationLogger.trace('Registration of Application Logger completed!');
  }

  private registerErrorHandler(): void {
    const applicationLogger = this.logger.child({
      loggerType: 'application',
    });

    applicationLogger.trace('Registration of Application Error Handler...');

    this.container.register({
      applicationErrorHandler: Awilix.asValue(this.errorHandler),
      errorHandler: Awilix.aliasTo('applicationErrorHandler'),
    });

    applicationLogger.trace(
      'Registration of Application Error Handler completed!',
    );
  }

  private registerApp(): void {
    this.logger.trace('Registration of application...');

    this.container.register({
      app: Awilix.asValue(this),
    });

    this.logger.trace('Registration of application completed!');
  }

  private registerEnv(): void {
    this.logger.trace('Registration of env...');

    this.container.register({
      env: Awilix.asValue(this.env),
    });

    this.logger.trace('Registration of env completed!');
  }

  private async listen(): Promise<void> {
    await this.app.listen(this.port);
    this.logger.trace(`Application Listening in Port ${this.port}`);
  }

  private subscribeToErrors(): void {
    process.on('unhandledRejection', (reason: Error) => {
      throw reason;
    });

    process.on('uncaughtException', (error: Error) => {
      this.errorHandler.handleError(error);
      if (!this.errorHandler.isTrustedError(error)) {
        process.exit(1);
      }
    });
  }

  async start(): Promise<void> {
    this.logger.trace('Starting the application...');

    await this.listen();

    this.registerEnv();

    this.registerLogger();
    this.registerErrorHandler();

    await this.initializePlugins();

    this.initializeMiddlewares();
    this.initializeRouters();

    this.registerApp();

    this.subscribeToErrors();

    this.logger.info('Application Ready to be Used!');
  }
}
