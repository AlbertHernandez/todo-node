import * as Sentry from '@sentry/node';
import { ApiUser } from '../../interfaces';
import { ErrorTracker } from 'src/server/modules/error-tracker/interfaces';
import * as Koa from 'koa';
import { BaseMiddleware } from 'src/server/api/middlewares/base-middleware';

export class ConfigureSentryScopeMiddleware extends BaseMiddleware {
  async use(ctx: Koa.Context, next: Koa.Next) {
    const { requestId } = ctx.scope.resolve('requestContext');
    const user: ApiUser | null = ctx?.session?.user;

    const errorTracker: ErrorTracker = this.app.container.resolve(
      'errorTracker',
    );
    errorTracker.configureScope((scope: Sentry.Scope) => {
      scope.addEventProcessor((event) => {
        return Sentry.Handlers.parseRequest(event, ctx.request);
      });

      scope.setTag('Type', 'Request');

      scope.setContext('Request', {
        requestId,
      });

      scope.setUser({
        ip_address: ctx.ip,
        username: user?.name,
        type: user?.type,
      });
    });

    await next();
  }
}
