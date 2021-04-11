import { asValue } from "awilix";
import { IApp } from "../../interfaces";
import { createScope } from "../../modules/di/helpers";
import { Middleware } from "../types";

export const initializeScopeMiddleware: Middleware = (app: IApp) =>
  async function initializeScopeMiddleware(ctx, next) {
    const requestId = ctx.state.id;

    const scope = createScope(app.container, {
      loggerType: "request",
      requestId: ctx.state.id,
    });

    app.container.register({
      requestContext: asValue({
        requestId,
      }),
    });

    ctx.scope = scope;

    await next();
  };
