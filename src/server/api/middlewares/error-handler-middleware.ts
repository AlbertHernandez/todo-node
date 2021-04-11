import { IErrorHandler } from "../../modules/error-handler/interfaces";
import { HttpStatusCode, Middleware } from "../types";

const isClientError = (
  error: Error & { status?: string | number }
): boolean => {
  return Boolean(
    error && error.status && error.status.toString().startsWith("4")
  );
};

export const errorHandlerMiddleware: Middleware = () =>
  async function errorHandlerMiddleware(ctx, next) {
    try {
      await next();
    } catch (error) {
      const errorHandler: IErrorHandler = ctx.scope.resolve("errorHandler");
      await errorHandler.handleError(error);

      const clientError = isClientError(error);
      ctx.status = error.status || HttpStatusCode.INTERNAL_SERVER;

      ctx.body = {
        error: {
          message: clientError ? error.message : "Internal Server Error",
          meta: clientError ? error.meta : undefined,
        },
      };
    }
  };
