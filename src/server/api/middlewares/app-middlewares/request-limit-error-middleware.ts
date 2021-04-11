import { HttpStatusCode } from "../../enums";
import { AppMiddleware } from "./interfaces";
import { TooManyRequestsError } from "../../errors";

export const requestLimitErrorMiddleware: AppMiddleware = () =>
  async function requestLimitErrorMiddleware(ctx, next) {
    try {
      await next();
    } catch (error) {
      if (ctx.status === HttpStatusCode.TooManyRequests) {
        throw new TooManyRequestsError(error.message, ctx.ip, {
          limit: error.headers["X-RateLimit-Limit"],
        });
      } else {
        throw error;
      }
    }
  };
