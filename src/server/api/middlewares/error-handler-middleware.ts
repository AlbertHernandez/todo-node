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
    const clientError = isClientError(error);
    ctx.status = error.status || 500;

    ctx.body = {
      error: {
        message: clientError ? error.message : "Internal Server Error",
        meta: clientError ? error.meta : undefined,
      },
    };
    ctx.errorMessage = error.message;
    ctx.errorStack = error.stack;
  }
};
