import { Middleware } from "../types";

const INTERNAL_SERVER_ERROR_MESSAGE = "Internal Server Error";

export const errorHandlerMiddleware: Middleware = () => async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      error: INTERNAL_SERVER_ERROR_MESSAGE,
    };
    ctx.errorMessage = error.message;
  }
};
