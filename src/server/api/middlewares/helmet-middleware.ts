import helmet from "koa-helmet";
import { Middleware } from "../types";

export const helmetMiddleware: Middleware = () => helmet();
