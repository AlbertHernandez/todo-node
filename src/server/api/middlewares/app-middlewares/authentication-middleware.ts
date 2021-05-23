import { ApiUser } from '../../interfaces';
import * as Koa from 'koa';
import { BaseMiddleware } from '@middlewares/base-middleware';

export class AuthenticationMiddleware extends BaseMiddleware {
  apiUsers;

  constructor(dependencies: { apiUsers: ApiUser[] }) {
    super();
    this.apiUsers = dependencies.apiUsers;
  }

  async use(ctx: Koa.Context, next: Koa.Next) {
    const apiKey = ctx.get('api-key');

    const user = this.apiUsers.find((user) => user.key === apiKey) ?? null;

    ctx.session = {
      user,
    };

    await next();
  }
}
