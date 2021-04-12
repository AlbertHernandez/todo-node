import * as Koa from "koa";
import rateLimit from "koa-ratelimit";
import { AppMiddleware } from "./interfaces";
import { Env } from "../../../config/environment/interfaces";
import { HttpStatusCode } from "../../enums";
import { TooManyRequestsError } from "../../errors";

const TEN_MINUTES = 10 * 60 * 1000;

export const ratelimitMiddleware: AppMiddleware = (app) => {
  const db = new Map();
  return async function ratelimitMiddleware(ctx, next) {
    try {
      return await rateLimit({
        driver: "memory",
        db,
        id: (ctx: Koa.Context) => ctx.ip,
        max: 100,
        duration: TEN_MINUTES,
        disableHeader: false,
        throw: true,
        whitelist: () => {
          const env: Env = app.env;
          return env.development || env.test;
        },
      })(ctx, next);
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
};
