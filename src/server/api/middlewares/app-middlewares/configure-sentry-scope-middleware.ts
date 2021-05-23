import * as Sentry from '@sentry/node';
import { AppMiddleware } from './interfaces';
import { ApiUser } from '../../interfaces';
import { ErrorTracker } from '@modules/error-tracker/interfaces';

export const configureSentryScopeMiddleware: AppMiddleware = (app) =>
  async function initializeErrorTrackerScopeMiddleware(ctx, next) {
    const { requestId } = ctx.scope.resolve('requestContext');
    const user: ApiUser | null = ctx?.session?.user;

    const errorTracker: ErrorTracker = app.container.resolve('errorTracker');
    errorTracker.configureScope((scope: Sentry.Scope) => {
      scope.addEventProcessor((event) => {
        return Sentry.Handlers.parseRequest(event, ctx.request);
      });

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
  };
