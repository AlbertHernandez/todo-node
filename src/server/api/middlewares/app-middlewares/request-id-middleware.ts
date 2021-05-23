import requestId from 'koa-requestid';
import * as Koa from 'koa';
import { BaseMiddleware } from '@middlewares/base-middleware';

export class RequestIdMiddleware extends BaseMiddleware {
  async use(ctx: Koa.Context, next: Koa.Next) {
    return requestId()(ctx, next);
  }
}
