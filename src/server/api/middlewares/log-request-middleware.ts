import { ILogger } from "../../modules/logger/interfaces";
import { Middleware } from "../types";

export const logRequestMiddleware: Middleware = () => async (ctx, next) => {
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
    const commonFinishingRequestContext = {
      body: ctx.body,
      status: ctx.status,
    };

    if (ctx.errorMessage) {
      logger.error({
        msg: "Finishing Request",
        context: {
          response: {
            ...commonFinishingRequestContext,
            errorMessage: ctx.errorMessage,
            errorStack: ctx.errorStack,
          },
        },
      });
    } else {
      logger.info({
        msg: "Finishing Request",
        context: {
          response: {
            ...commonFinishingRequestContext,
            status: ctx.status,
          },
        },
      });
    }
  }
};