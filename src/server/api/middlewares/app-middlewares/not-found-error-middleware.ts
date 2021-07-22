import { HttpStatusCode } from '../../constants';
import { NotFoundError } from '../../errors';
import * as Koa from 'koa';
import { BaseMiddleware } from '../base-middleware';

export class NotFoundErrorMiddleware extends BaseMiddleware {
  async use(ctx: Koa.Context, next: Koa.Next) {
    try {
      await next();
    } finally {
      if (ctx.status === HttpStatusCode.NotFound) {
        throw new NotFoundError('Not Found', ctx.ip);
      }
    }
  }
}
