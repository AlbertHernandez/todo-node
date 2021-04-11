import { ILogger } from "../../modules/logger/interfaces";
import { AppMiddleware } from "../types";

export const logRequestMiddleware: AppMiddleware = () =>
  async function logRequestMiddleware(ctx, next) {
    const logger: ILogger = ctx.scope.resolve("logger");

    try {
      logger.info({
        msg: "Incoming Request",
        context: {
          method: ctx.request.method,
          url: ctx.url,
          header: ctx.header,
        },
      });
      await next();
    } finally {
      logger.info({
        msg: "Finishing Request",
        context: {
          body: ctx.body,
          status: ctx.status,
        },
      });
    }
  };
