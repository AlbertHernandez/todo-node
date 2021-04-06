import * as Koa from "koa";
import { AwilixContainer, asValue } from "awilix";
import { createScope } from "../../modules/di/helpers";

export const initializeScopeMiddleware = (
  container: AwilixContainer
): Koa.Middleware => async (ctx, next) => {
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
