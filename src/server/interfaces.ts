import Koa from "koa";
import awilix from "awilix";

export interface IApp {
  app: Koa;
  start: () => Promise<void>;
  env?: any;
  port: number;
  container: awilix.AwilixContainer;
}
