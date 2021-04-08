import { ObjectSchema } from "@hapi/joi";
import { AwilixContainer } from "awilix";
import * as Koa from "koa";

export type Request = {
  [RequestValues.BODY]: any;
  [RequestValues.QUERY]: any;
  [RequestValues.HEADERS]: any;
  [RequestValues.PARAMS]: any;
  scope: AwilixContainer;
  response?: any;
};

export enum RequestValues {
  BODY = "body",
  QUERY = "query",
  HEADERS = "headers",
  PARAMS = "params",
}

export type Handler = [string, string];

export type Middleware = (container: AwilixContainer) => Koa.Middleware;

export type RequestMiddleware = (ctx: any) => Koa.Middleware;

export type SchemasConfig = Partial<{
  [RequestValues.QUERY]?: ObjectSchema;
  [RequestValues.BODY]?: ObjectSchema;
  [RequestValues.PARAMS]?: ObjectSchema;
  [RequestValues.HEADERS]?: ObjectSchema;
}>;

export type RouterConfig = {
  prefix?: any;
  routes: {
    [description: string]: {
      method: "get" | "post";
      path?: string;
      schema?: SchemasConfig;
      handler: Handler;
    };
  };
};
