import { AppMiddleware } from "./interfaces";

export const unifiedResponseMiddleware: AppMiddleware = () =>
  async function unifiedResponseMiddleware(ctx, next) {
    try {
      await next();
    } finally {
      const { requestId } = ctx.scope.resolve("requestContext");
      ctx.body = {
        data: ctx.body,
        requestId,
      };
    }
  };
