import * as Koa from "koa";
import { Handler, Request } from "../types";

const lowercaseFirstLetter = (source: string): string => {
  return source.charAt(0).toLowerCase() + source.slice(1);
};

export const requestHandlerMiddleware = (handler: Handler) => {
  return async (ctx: Koa.Context): Promise<void> => {
    const [handlerClassName, handlerMethod] = handler;

    if (!ctx.scope.has(handlerClassName)) {
      throw new Error(
        `Handler class name "${handlerClassName}" does not exists`
      );
    }

    const handlerClass: any = ctx.scope.resolve(
      lowercaseFirstLetter(handlerClassName)
    );

    if (
      !handlerClass[handlerMethod] ||
      typeof handlerClass[handlerMethod] !== "function"
    ) {
      throw new Error(
        `Handler Method "${handlerMethod}" does not exists in the handler class "${handlerClassName}"`
      );
    }

    const normalizedRequest: Request = {
      body: ctx.request.body,
      headers: ctx.request.headers,
      query: ctx.request.query,
      params: ctx.params,
    };

    const handlerResponse = await handlerClass[handlerMethod].bind(
      handlerClass
    )(normalizedRequest);

    ctx.body = handlerResponse || {};
  };
};
