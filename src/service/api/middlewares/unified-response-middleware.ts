import { Middleware } from "../types";

export const unifiedResponseMiddleware: Middleware = () => async (
  ctx,
  next
) => {
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
