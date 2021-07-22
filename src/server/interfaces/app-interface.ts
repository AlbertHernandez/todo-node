import * as Koa from 'koa';
import * as Awilix from 'awilix';
import { Logger } from 'src/server/modules/logger/interfaces';
import { ErrorHandler } from 'src/server/modules/error-handler/interfaces';

export interface App {
  app: Koa;
  start: () => Promise<void>;
  env?: any;
  port: number;
  container: Awilix.AwilixContainer;
  logger: Logger;
  errorHandler: ErrorHandler;
}
