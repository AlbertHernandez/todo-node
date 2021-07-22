import * as Koa from 'koa';
import { App } from 'src/server/interfaces';

export type AppMiddleware = (app: App) => Koa.Middleware;
