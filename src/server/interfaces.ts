import * as Koa from "koa";
import * as Awilix from "awilix";
import { ILogger } from "./modules/logger/interfaces";

export interface IApp {
  app: Koa;
  start: () => Promise<void>;
  env?: any;
  port: number;
  container: Awilix.AwilixContainer;
  logger: ILogger;
}
