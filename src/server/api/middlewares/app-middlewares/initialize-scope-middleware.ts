import * as Awilix from "awilix";
import { IApp } from "../../../interfaces";
import { createScope } from "../../../modules/di/helpers";
import { AppMiddleware } from "./types";

export const initializeScopeMiddleware: AppMiddleware = (app: IApp) =>
  async function initializeScopeMiddleware(ctx, next) {
    const requestId = ctx.state.id;

    const scope = createScope(app.container, {
      loggerType: "request",
      requestId: ctx.state.id,
    });

    app.container.register({
      requestContext: Awilix.asValue({
        requestId,
      }),
    });

    ctx.scope = scope;

    await next();
  };
