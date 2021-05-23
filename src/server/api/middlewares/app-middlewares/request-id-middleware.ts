import requestId from 'koa-requestid';
import { AppMiddleware } from './interfaces';

export const requestIdMiddleware: AppMiddleware = () => {
  return async function requestIdMiddleware(ctx, next) {
    return requestId()(ctx, next);
  };
};
