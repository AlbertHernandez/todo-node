import * as Koa from "koa";
import { Handler, Request } from "../types";

const lowercaseFirstLetter = (source: string): string => {
  return source.charAt(0).toLowerCase() + source.slice(1);
};

const resolveHandler = (handler: Handler, request: Request) => {
  const [handlerClassName, handlerMethod] = handler;

  if (!request.scope.has(handlerClassName)) {
    throw new Error(`Handler class name "${handlerClassName}" does not exists`);
  }

  const handlerClass: any = request.scope.resolve(
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

  return handlerClass[handlerMethod].bind(handlerClass)(request);
};

export const requestHandlerMiddleware = (handler: Handler) => {
  return async ({ normalizedRequest }: Koa.Context): Promise<void> => {
    const [handlerClassName, handlerMethod] = handler;

    if (!normalizedRequest.scope.has(handlerClassName)) {
      throw new Error(
        `Handler class name "${handlerClassName}" does not exists`
      );
    }

    const handlerClass: any = normalizedRequest.scope.resolve(
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

    normalizedRequest.response = await handlerClass[handlerMethod].bind(
      handlerClass
    )(normalizedRequest);
  };
};
