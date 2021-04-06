import * as Koa from "koa";

export const errorHandlerMiddleware: Koa.Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      error: "Internal Server Error",
    };
  }
};
