import * as Koa from 'koa'
import { App } from '../../../../interfaces'

export type AppMiddleware = (app: App) => Koa.Middleware
