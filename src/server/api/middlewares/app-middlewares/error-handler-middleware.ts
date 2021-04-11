import { HttpStatusCode } from "../../enums";
import { AppMiddleware } from "./interfaces";

const isClientError = (
  error: Error & { status?: string | number }
): boolean => {
  return Boolean(
    error && error.status && error.status.toString().startsWith("4")
  );
};

export const errorHandlerMiddleware: AppMiddleware = (app) =>
  async function errorHandlerMiddleware(ctx, next) {
    try {
      await next();
    } catch (error) {
      await app.errorHandler.handleError(error);

      const clientError = isClientError(error);
      ctx.status = error.status || HttpStatusCode.InternalServer;

      ctx.body = {
        error: {
          message: clientError ? error.message : "Internal Server Error",
          meta: clientError ? error.meta : undefined,
        },
      };
    }
  };
