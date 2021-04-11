import helmet from "koa-helmet";
import { AppMiddleware } from "./interfaces";

export const helmetMiddleware: AppMiddleware = () => helmet();
