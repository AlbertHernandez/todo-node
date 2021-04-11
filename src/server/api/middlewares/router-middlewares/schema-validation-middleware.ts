import * as Koa from "koa";
import { RequestValues } from "../../enums";
import { RequestValidationError } from "../../errors";
import { SchemasConfig } from "../../interfaces";

function getRequestPart(
  ctx: Koa.ParameterizedContext,
  requestPart: RequestValues
): NodeJS.Dict<any> {
  if (requestPart === RequestValues.Params) {
    return ctx.params;
  }

  return ctx.request[requestPart];
}

function setRequestPart(
  ctx: Koa.ParameterizedContext,
  requestPart: RequestValues,
  value: any
): void {
  if (requestPart === RequestValues.Params) {
    ctx.params = value;
  } else {
    ctx.request[requestPart] = value;
  }
}

export const schemaValidationMiddleware = (schemas: SchemasConfig | null) => {
  return async function schemaValidationMiddleware(
    ctx: Koa.Context,
    next: Koa.Next
  ) {
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
