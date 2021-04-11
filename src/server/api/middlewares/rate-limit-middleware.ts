import * as Koa from "koa";
import ratelimit from "koa-ratelimit";
import { Middleware } from "../types";
import { IApp } from "../../interfaces";
import { Env } from "../../config/environment/types";

export const ratelimitMiddleware: Middleware = (app: IApp) =>
  ratelimit({
    driver: "memory",
    db: new Map(),
    id: (ctx: Koa.Context) => ctx.ip,
    max: 100,
    duration: 600000, // 10 min
    disableHeader: false,
    whitelist: () => {
      const env: Env = app.env;
      return env.development || env.test;
    },
  });
