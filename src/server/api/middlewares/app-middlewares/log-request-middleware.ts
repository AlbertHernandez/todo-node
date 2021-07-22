import { Logger } from 'src/server/modules/logger/interfaces';
import * as Koa from 'koa';
import { BaseMiddleware } from 'src/server/api/middlewares/base-middleware';

export class LogRequestMiddleware extends BaseMiddleware {
  async use(ctx: Koa.Context, next: Koa.Next) {
    const logger: Logger = ctx.scope.resolve('logger');

    try {
      logger.debug({
        msg: 'Incoming Request',
        context: {
          method: ctx.request.method,
          url: ctx.url,
          header: ctx.header,
          body: ctx.request.body,
        },
      });
      await next();
    } finally {
      logger.debug({
        msg: 'Finishing Request',
        context: {
          body: ctx.body,
          status: ctx.status,
        },
      });
    }
  }
}
