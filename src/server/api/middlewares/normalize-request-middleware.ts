import * as Koa from "koa";
import { Request } from "../types";

export const normalizeRequestMiddleware = () => {
  return async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
    const normalizedRequest: Request = {
      body: ctx.request.body,
      headers: ctx.request.headers,
      query: ctx.request.query,
      params: ctx.params,
      scope: ctx.scope,
    };

    ctx.normalizedRequest = normalizedRequest;

    await next();

    ctx.body = ctx.normalizedRequest.response;
    ctx.request.headers = ctx.normalizedRequest.headers;
    ctx.request.query = ctx.normalizedRequest.query;
    ctx.params = ctx.normalizedRequest.params;
  };
};
