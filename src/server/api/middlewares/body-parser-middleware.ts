import bodyParser from "koa-bodyparser";
import { AppMiddleware } from "../types";

export const bodyParserMiddleware: AppMiddleware = () => bodyParser();
