import ratelimit from "koa-ratelimit";
import { Middleware } from "../types";
import Koa from "koa";
import { env } from "../../../config/environment";

export const ratelimitMiddleware: Middleware = () =>
  ratelimit({
    driver: "memory",
    db: new Map(),
    id: (ctx: Koa.Context) => ctx.ip,
    max: 100,
    duration: 600000, // 10 min
    disableHeader: false,
    whitelist: () => {
      return env.development || env.test;
    },
  });
