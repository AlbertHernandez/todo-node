import Koa from "koa";
import ratelimit from "koa-ratelimit";
import { AwilixContainer } from "awilix";

import { Middleware } from "../types";

export const ratelimitMiddleware: Middleware = (container: AwilixContainer) =>
  ratelimit({
    driver: "memory",
    db: new Map(),
    id: (ctx: Koa.Context) => ctx.ip,
    max: 100,
    duration: 600000, // 10 min
    disableHeader: false,
    whitelist: () => {
      const env: any = container.resolve("env");
      return env.development || env.test;
    },
  });
