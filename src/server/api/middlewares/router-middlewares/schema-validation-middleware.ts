import * as Koa from 'koa'
import { HttpStatusCode, RequestValues } from '../../constants'
import { BadRequestError } from '../../errors'
import { SchemasConfig } from '../../interfaces'

function getRequestPart (
  ctx: Koa.ParameterizedContext,
  requestPart: RequestValues
): NodeJS.Dict<any> {
  if (requestPart === RequestValues.Params) {
    return ctx.params
  }

  return ctx.request[requestPart]
}

function setRequestPart (
  ctx: Koa.ParameterizedContext,
  requestPart: RequestValues,
  value: any
): void {
  if (requestPart === RequestValues.Params) {
    ctx.params = value
  } else {
    ctx.request[requestPart] = value
  }
}

export const schemaValidationMiddleware = (schemas: SchemasConfig | null) => {
  return async function schemaValidationMiddleware (
    ctx: Koa.Context,
    next: Koa.Next
  ) {
    if (schemas != null) {
      Object.entries(schemas).forEach(([requestPart, schema]) => {
        const requestPartType = requestPart as RequestValues
        if (schema != null) {
          const requestPart = getRequestPart(ctx, requestPartType)

          const { error, value } = schema.validate(requestPart)

          if (error != null) {
            ctx.status = HttpStatusCode.BadRequest
            throw new BadRequestError(error.message, ctx.ip)
          }

          if (Object.values(RequestValues).includes(requestPartType)) {
            setRequestPart(ctx, requestPartType, value)
          }
        }
      })
    }

    await next()
  }
}
