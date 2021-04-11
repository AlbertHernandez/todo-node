import * as Koa from "koa";
import * as Awilix from "awilix";
import { ILogger } from "./modules/logger/interfaces";
import { IErrorHandler } from "./modules/error-handler/interfaces";

export interface IApp {
  app: Koa;
  start: () => Promise<void>;
  env?: any;
  port: number;
  container: Awilix.AwilixContainer;
  logger: ILogger;
  errorHandler: IErrorHandler;
}
