import * as Awilix from 'awilix';
import { createScope } from '@modules/di/helpers';
import * as Koa from 'koa';
import { BaseMiddleware } from '@middlewares/base-middleware';

export class InitializeScopeMiddleware extends BaseMiddleware {
  async use(ctx: Koa.Context, next: Koa.Next) {
    const requestId = ctx.state.id;

    const scope = createScope(this.app.container, {
      loggerType: 'request',
      requestId: ctx.state.id,
    });

    this.app.container.register({
      requestContext: Awilix.asValue({
        requestId,
      }),
    });

    ctx.scope = scope;

    await next();
  }
}
