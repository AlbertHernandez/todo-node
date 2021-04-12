import { HttpStatusCode } from "../../enums";
import { AppMiddleware } from "./interfaces";
import { NotFoundError } from "../../errors";

export const notFoundErrorMiddleware: AppMiddleware = () =>
  async function notFoundErrorMiddleware(ctx, next) {
    try {
      await next();
    } finally {
      if (ctx.status === HttpStatusCode.NotFound) {
        throw new NotFoundError("Not Found", ctx.ip);
      }
    }
  };
