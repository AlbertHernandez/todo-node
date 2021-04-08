import Router from "koa-router";

export interface IApiRouter {
  middleware: () => Router.IMiddleware;
}
