import { AwilixContainer, Constructor } from "awilix";
import * as Koa from "koa";

export type Request = {
  body: any;
  scope: AwilixContainer;
};

export type Handler = [Constructor<any>, string];

export type Middleware = (container: AwilixContainer) => Koa.Middleware;
