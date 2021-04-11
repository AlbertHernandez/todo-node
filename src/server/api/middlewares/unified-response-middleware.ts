import { HttpStatusCode, Middleware } from "../types";

export const unifiedResponseMiddleware: Middleware = () =>
  async function unifiedResponseMiddleware(ctx, next) {
    await next();

    const existsRoute = ctx.status !== HttpStatusCode.NOT_FOUND;

    if (existsRoute) {
      const { requestId } = ctx.scope.resolve("requestContext");
      ctx.body = {
        data: ctx.body,
        requestId,
      };
    }
  };
