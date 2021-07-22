import bodyParser from 'koa-bodyparser';

import * as Koa from 'koa';
import { BaseMiddleware } from '../base-middleware';

export class BodyParserMiddleware extends BaseMiddleware {
  async use(ctx: Koa.Context, next: Koa.Next) {
    return bodyParser()(ctx, next);
  }
}
