import Koa from "koa";
import awilix from "awilix";
import { ILogger } from "./modules/logger/interfaces";

export interface IApp {
  app: Koa;
  start: () => Promise<void>;
  env?: any;
  port: number;
  container: awilix.AwilixContainer;
  logger: ILogger;
}
