import { Middleware } from "../types";

const isClientError = (
  error: Error & { status?: string | number }
): boolean => {
  return Boolean(
    error && error.status && error.status.toString().startsWith("4")
  );
};

export const errorHandlerMiddleware: Middleware = () => async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      error: isClientError(error) ? error.message : "Internal Server Error",
    };
    ctx.errorMessage = error.message;
    ctx.errorStack = error.stack;
  }
};
