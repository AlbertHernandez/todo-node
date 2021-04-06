import * as Koa from "koa";

export const unifiedResponseMiddleware: Koa.Middleware = async (ctx, next) => {
  try {
    await next();
  } finally {
    const { requestId } = ctx.scope.resolve("requestContext");
    ctx.body = {
      data: ctx.body,
      requestId,
    };
  }
};
