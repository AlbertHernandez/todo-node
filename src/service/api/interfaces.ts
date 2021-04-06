import Router from "koa-router";

export interface IRouter {
  middleware: () => Router.IMiddleware;
}
