import { HttpStatusCode } from '../../constants';
import { AppMiddleware } from './interfaces';
import { NotFoundError } from '../../errors';

export const notFoundErrorMiddleware: AppMiddleware = () =>
  async function notFoundErrorMiddleware(ctx, next) {
    try {
      await next();
    } finally {
      if (ctx.status === HttpStatusCode.NotFound) {
        // eslint-disable-next-line no-unsafe-finally
        throw new NotFoundError('Not Found', ctx.ip);
      }
    }
  };
