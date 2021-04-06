import * as Koa from "koa";
import { AwilixContainer, asValue } from "awilix";

export const initializeScopeMiddleware = (
  container: AwilixContainer
): Koa.Middleware => async (ctx, next) => {
  const scope = container.createScope();

  scope.register({
    requestContext: asValue({
      requestId: ctx.state.id,
    }),
  });

  ctx.scope = scope;

  await next();
};
