import { App } from 'src/server/interfaces';
import * as Koa from 'koa';

export interface Middleware {
  use: (ctx: Koa.Context, next: Koa.Next) => Promise<void>;
  setApp?: (app: App) => void;
}
