import * as Koa from "koa";
import { Handler, Request } from "../types";

const lowercaseFirstLetter = (source: string): string => {
  return source.charAt(0).toLowerCase() + source.slice(1);
};

const resolveHandler = (handler: Handler, request: Request) => {
  const [HandlerClass, handlerMethod] = handler;

  const handlerClass: any = request.scope.resolve(
    lowercaseFirstLetter(HandlerClass.name)
  );

  if (
    !handlerClass[handlerMethod] ||
    typeof handlerClass[handlerMethod] !== "function"
  ) {
    throw new Error("Action not exists or not a function");
  }

  return handlerClass[handlerMethod].bind(handlerClass)(request);
};

export const requestHandlerMiddleware = (handler: Handler) => {
  return async (ctx: Koa.Context): Promise<void> => {
    const request: Request = {
      body: ctx.request.body,
      scope: ctx.scope,
    };

    const response = await resolveHandler(handler, request);

    ctx.body = response;
  };
};
