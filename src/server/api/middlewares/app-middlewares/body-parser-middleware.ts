import bodyParser from "koa-bodyparser";
import { AppMiddleware } from "./interfaces";

export const bodyParserMiddleware: AppMiddleware = () => bodyParser();
