import { RequestValidationError } from "../errors";
import { RequestMiddleware, RequestValues, SchemasConfig } from "../types";

export const schemaValidation: RequestMiddleware = (
  schemas: SchemasConfig | null
) => {
  return async ({ normalizedRequest }, next) => {
    if (schemas) {
      Object.entries(schemas).forEach(([requestPart, schema]) => {
        const requestPartType = requestPart as RequestValues;
        if (schema) {
          const requestPart = normalizedRequest[requestPartType];

          const { error, value } = schema.validate(requestPart);

          if (error) {
            throw new RequestValidationError(error.message);
          }

          if (Object.values(RequestValues).includes(requestPartType)) {
            normalizedRequest[requestPartType] = value;
          }
        }
      });
    }

    await next();
  };
};
