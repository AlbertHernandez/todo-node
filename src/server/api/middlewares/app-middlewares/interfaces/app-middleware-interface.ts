import * as Koa from 'koa';
import { App } from '@server/interfaces';

export type AppMiddleware = (app: App) => Koa.Middleware;
