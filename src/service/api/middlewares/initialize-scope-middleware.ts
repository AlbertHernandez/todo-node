import * as Koa from "koa";
import { AwilixContainer, asValue } from "awilix";
import { createScope } from "../../modules/di/helpers";
import { Middleware } from "../types";

export const initializeScopeMiddleware: Middleware = (
  container: AwilixContainer
) => async (ctx, next) => {
  const requestId = ctx.state.id;

  const scope = createScope(container, {
    loggerType: "request",
    requestId: ctx.state.id,
  });

  container.register({
    requestContext: asValue({
      requestId,
    }),
  });

  ctx.scope = scope;

  await next();
};
