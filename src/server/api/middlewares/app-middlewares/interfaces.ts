import * as Koa from "koa";
import { App } from "../../../interfaces";

export interface AppMiddleware {
  (app: App): Koa.Middleware;
}
