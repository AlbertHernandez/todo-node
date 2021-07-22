import { Middleware } from './interfaces/middleware-interface';
import { App } from 'src/server/interfaces';
import * as Koa from 'koa';

export class BaseMiddleware implements Middleware {
  private _app?: App;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async use(ctx: Koa.Context, next: Koa.Next) {
    throw new Error('Implement Method!');
  }

  setApp(app: App) {
    this._app = app;
  }

  get app() {
    if (!this._app) {
      throw new Error('App Needed!');
    }

    return this._app;
  }
}
