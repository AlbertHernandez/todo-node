import KoaRouter from "koa-router";

import { IApiRouter } from "./interfaces";
import { Handler } from "./types";
import { requestHandlerMiddleware } from "./middlewares";

export class Router implements IApiRouter {
  private router: KoaRouter;

  constructor(dependencies: { prefix: string }) {
    this.router = new KoaRouter({ prefix: dependencies.prefix });
  }

  get(path: string, handler: Handler) {
    this.router.get(path, requestHandlerMiddleware(handler));
  }

  post(path: string, handler: Handler) {
    this.router.post(path, requestHandlerMiddleware(handler));
  }

  middleware() {
    return this.router.middleware();
  }
}
