import * as Koa from "koa";
import KoaRouter from "koa-router";
import { IRouter } from "./interfaces";
import { Request, RouterHandler } from "./types";

export class Router implements IRouter {
  private router: KoaRouter;

  constructor(dependencies: { prefix: string }) {
    this.router = new KoaRouter({ prefix: dependencies.prefix });
  }

  private normalizeRequest(ctx: Koa.Context): Request {
    return {
      body: ctx.request.body,
    };
  }

  private normalizeResponse(ctx: Koa.Context, response: any): Koa.Context {
    ctx.body = response;
    return ctx;
  }

  private async normalizeHandlerMethod(
    ctx: Koa.Context,
    handlerMethod: (request: Request) => Promise<any>
  ) {
    const normalizedRequest = this.normalizeRequest(ctx);
    const response = await handlerMethod(normalizedRequest);
    return this.normalizeResponse(ctx, response);
  }

  get(path: string, handler: RouterHandler) {
    this.router.get(path, async (ctx: Koa.Context) => {
      return this.normalizeHandlerMethod(ctx, handler);
    });
  }

  post(path: string, handler: RouterHandler) {
    this.router.post(path, async (ctx: Koa.Context) => {
      return this.normalizeHandlerMethod(ctx, handler);
    });
  }

  middleware() {
    return this.router.middleware();
  }
}
