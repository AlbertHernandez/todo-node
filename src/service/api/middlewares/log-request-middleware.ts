import { ILogger } from "../../modules/logger/interfaces";
import { Middleware } from "../types";

export const logRequestMiddleware: Middleware = () => async (ctx, next) => {
  const logger: ILogger = ctx.scope.resolve("logger");

  try {
    logger.info("Incoming Request", {
      request: {
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
      logger.error("Finishing Request", {
        response: {
          ...commonFinishingRequestContext,
          errorMessage: ctx.errorMessage,
        },
      });
    } else {
      logger.info("Finishing Request", {
        response: {
          ...commonFinishingRequestContext,
          status: ctx.status,
        },
      });
    }
  }
};
