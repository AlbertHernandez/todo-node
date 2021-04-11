import helmet from "koa-helmet";
import { AppMiddleware } from "./types";

export const helmetMiddleware: AppMiddleware = () => helmet();
