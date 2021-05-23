import helmet from 'koa-helmet';
import { AppMiddleware } from './interfaces';

export const helmetMiddleware: AppMiddleware = () => {
  return async function helmetMiddleware(ctx, next) {
    return helmet()(ctx, next);
  };
};
