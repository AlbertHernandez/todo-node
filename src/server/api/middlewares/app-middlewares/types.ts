import * as Koa from "koa";
import { IApp } from "../../../interfaces";

export type AppMiddleware = (app: IApp) => Koa.Middleware;
