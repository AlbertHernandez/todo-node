import bodyParser from "koa-bodyparser";
import { AppMiddleware } from "./interfaces";

export const bodyParserMiddleware: AppMiddleware = () => {
  return async function bodyParserMiddleware(ctx, next) {
    return await bodyParser()(ctx, next);
  };
};
