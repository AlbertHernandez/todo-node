import Koa from "koa";
import ratelimit from "koa-ratelimit";
import { Middleware } from "../types";
import { IApp } from "../../interfaces";

export const ratelimitMiddleware: Middleware = (app: IApp) =>
  ratelimit({
    driver: "memory",
    db: new Map(),
    id: (ctx: Koa.Context) => ctx.ip,
    max: 100,
    duration: 600000, // 10 min
    disableHeader: false,
    whitelist: () => {
      return app.env.development || app.env.test;
    },
  });
