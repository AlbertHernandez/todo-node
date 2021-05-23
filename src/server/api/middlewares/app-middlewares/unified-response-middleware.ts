import * as Koa from 'koa';
import { BaseMiddleware } from '@middlewares/base-middleware';

export class UnifiedResponseMiddleware extends BaseMiddleware {
  async use(ctx: Koa.Context, next: Koa.Next) {
    try {
      await next();
    } finally {
      const { requestId } = ctx.scope.resolve('requestContext');
      ctx.body = {
        data: ctx.body,
        requestId,
      };
    }
  }
}
