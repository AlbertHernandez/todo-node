import * as Koa from "koa";
import { RequestValidationError } from "../errors";
import { RequestValues, SchemasConfig } from "../types";

function getRequestPart(
  ctx: Koa.ParameterizedContext,
  requestPart: RequestValues
): NodeJS.Dict<any> {
  if (requestPart === RequestValues.PARAMS) {
    return ctx.params;
  }

  return ctx.request[requestPart];
}

function setRequestPart(
  ctx: Koa.ParameterizedContext,
  requestPart: RequestValues,
  value: any
): void {
  if (requestPart === RequestValues.PARAMS) {
    ctx.params = value;
  } else {
    ctx.request[requestPart] = value;
  }
}

export const schemaValidation = (schemas: SchemasConfig | null) => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    if (schemas) {
      Object.entries(schemas).forEach(([requestPart, schema]) => {
        const requestPartType = requestPart as RequestValues;
        if (schema) {
          const requestPart = getRequestPart(ctx, requestPartType);

          const { error, value } = schema.validate(requestPart);

          if (error) {
            throw new RequestValidationError(error.message);
          }

          if (Object.values(RequestValues).includes(requestPartType)) {
            setRequestPart(ctx, requestPartType, value);
          }
        }
      });
    }

    await next();
  };
};
