import * as Koa from "koa";
import rateLimit from "koa-ratelimit";
import { AppMiddleware } from "./interfaces";
import { Env } from "../../../config/environment/interfaces";

export const ratelimitMiddleware: AppMiddleware = (app) =>
  rateLimit({
    driver: "memory",
    db: new Map(),
    id: (ctx: Koa.Context) => ctx.ip,
    max: 100,
    duration: 600000, // 10 min
    disableHeader: false,
    throw: true,
    whitelist: () => {
      const env: Env = app.env;
      return env.development || env.test;
    },
  });
