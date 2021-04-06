import Router from "koa-router";

export interface IApplicationRouter {
  use: () => Router.IMiddleware;
}
