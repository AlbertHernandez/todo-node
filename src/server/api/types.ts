import { ObjectSchema } from "@hapi/joi";
import { AwilixContainer } from "awilix";
import * as Koa from "koa";

export type Request = {
  body: any;
  query: any;
  headers: any;
  params: any;
};

export enum RequestValues {
  BODY = "body",
  QUERY = "query",
  HEADERS = "headers",
  PARAMS = "params",
}

export type Handler = [string, string];

export type Middleware = (container: AwilixContainer) => Koa.Middleware;

export type SchemasConfig = Partial<{
  body?: ObjectSchema;
  query?: ObjectSchema;
  headers?: ObjectSchema;
  params?: ObjectSchema;
}>;

export enum UserName {
  GENERIC_API_USER = "generic-api-user",
}

export enum UserType {
  API = "api",
}

export type ApiUser = {
  type: UserType;
  name: UserName;
};
