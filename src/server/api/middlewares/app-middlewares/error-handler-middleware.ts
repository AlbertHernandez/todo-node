import { IApp } from "../../../interfaces";
import { HttpStatusCode } from "../../types";
import { AppMiddleware } from "./types";

const isClientError = (
  error: Error & { status?: string | number }
): boolean => {
  return Boolean(
    error && error.status && error.status.toString().startsWith("4")
  );
};

export const errorHandlerMiddleware: AppMiddleware = (app: IApp) =>
  async function errorHandlerMiddleware(ctx, next) {
    try {
      await next();
    } catch (error) {
      await app.errorHandler.handleError(error);

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
