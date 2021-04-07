import bodyParser from "koa-bodyparser";
import { Middleware } from "../types";

export const bodyParserMiddleware: Middleware = () => bodyParser();
