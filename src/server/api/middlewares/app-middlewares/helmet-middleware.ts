import helmet from 'koa-helmet';
import * as Koa from 'koa';
import { BaseMiddleware } from '../base-middleware';

export class HelmetMiddleware extends BaseMiddleware {
  async use(ctx: Koa.Context, next: Koa.Next) {
    return helmet()(ctx, next);
  }
}
