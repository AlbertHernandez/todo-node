import requestId from "koa-requestid";
import { Middleware } from "../types";

export const requestIdMiddleware: Middleware = () => requestId();
