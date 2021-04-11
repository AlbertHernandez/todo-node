import { HttpStatusCode } from "../../enums";
import { AppMiddleware } from "./interfaces";

export const unifiedResponseMiddleware: AppMiddleware = () =>
  async function unifiedResponseMiddleware(ctx, next) {
    await next();

    const existsRoute = ctx.status !== HttpStatusCode.NotFound;

    if (existsRoute) {
      const { requestId } = ctx.scope.resolve("requestContext");
      ctx.body = {
        data: ctx.body,
        requestId,
      };
    }
  };
