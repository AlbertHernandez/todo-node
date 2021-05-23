import * as Koa from 'koa';
import rateLimit from 'koa-ratelimit';
import { HttpStatusCode } from '../../constants';
import { TooManyRequestsError } from '../../errors';
import { BaseMiddleware } from '@middlewares/base-middleware';

export class RateLimitMiddleware extends BaseMiddleware {
  db;
  max;
  duration;
  driver;
  whitelist;

  constructor(dependencies: {
    max: number;
    duration: number;
    db: any;
    driver: 'redis' | 'memory';
    whitelist?: (ctx: Koa.Context) => boolean;
  }) {
    super();

    this.db = dependencies.db;
    this.max = dependencies.max;
    this.duration = dependencies.duration;
    this.driver = dependencies.driver;
    this.whitelist = dependencies.whitelist;
  }

  async use(ctx: Koa.Context, next: Koa.Next) {
    try {
      return rateLimit({
        driver: this.driver,
        db: this.db,
        id: (ctx: Koa.Context) => ctx.ip,
        max: this.max,
        duration: this.duration,
        disableHeader: false,
        throw: true,
        whitelist: this.whitelist,
      })(ctx, next);
    } catch (error) {
      if (ctx.status === HttpStatusCode.TooManyRequests) {
        throw new TooManyRequestsError(error.message, ctx.ip, {
          limit: error.headers['X-RateLimit-Limit'],
        });
      } else {
        throw error;
      }
    }
  }
}
