import { UserName, UserType } from '../../constants';
import { Env } from '@config/environment/interfaces';
import { App } from '@server/interfaces';
import { ApiUser } from '../../interfaces';
import * as Koa from 'koa';
import { BaseMiddleware } from '@middlewares/base-middleware';

export class AuthenticationMiddleware extends BaseMiddleware {
  async use(ctx: Koa.Context, next: Koa.Next) {
    const users = this.getUsers(this.app);
    const apiKey = ctx.get('api-key');

    const user = users.find((user) => user.key === apiKey) ?? null;

    ctx.session = {
      user,
    };

    await next();
  }

  private getUsers(app: App): ApiUser[] {
    const env: Env = app.env;
    return [
      {
        key: env.apiKey,
        name: UserName.GenericApiUser,
        type: UserType.Api,
      },
    ];
  }
}
