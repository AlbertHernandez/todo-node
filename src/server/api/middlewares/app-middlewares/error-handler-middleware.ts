import { ErrorHandler } from 'src/server/modules/error-handler/interfaces';
import { HttpStatusCode } from '../../constants';
import * as Koa from 'koa';
import { BaseMiddleware } from 'src/server/api/middlewares/base-middleware';

export class ErrorHandlerMiddleware extends BaseMiddleware {
  async use(ctx: Koa.Context, next: Koa.Next) {
    try {
      await next();
    } catch (error) {
      const errorHandler: ErrorHandler = ctx.scope.resolve('errorHandler');
      await errorHandler.handleError(error);

      const clientError = this.isClientError(error);
      ctx.status = error.status ?? HttpStatusCode.InternalServer;

      ctx.body = {
        error: {
          message: clientError ? error.message : 'Internal Server Error',
          meta: clientError ? error.meta : undefined,
        },
      };
    }
  }

  private isClientError(error: Error & { status?: string | number }): boolean {
    return Boolean(error?.status?.toString().startsWith('4'));
  }
}
