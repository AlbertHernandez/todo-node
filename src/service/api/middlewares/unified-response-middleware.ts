import * as Koa from "koa";

export const unifiedResponseMiddleware: Koa.Middleware = async (ctx, next) => {
  try {
    await next();
  } finally {
    ctx.body = {
      data: ctx.body,
      requestId: ctx.state.id,
    };
  }
};
