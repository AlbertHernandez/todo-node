import Router from "koa-router";

interface IRequestMethod {
  (msg: string, context?: any): any;
}

export interface IApiRouter {
  middleware: () => Router.IMiddleware;
  get: IRequestMethod;
  post: IRequestMethod;
}
