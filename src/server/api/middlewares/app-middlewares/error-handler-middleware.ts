import { ErrorHandler } from '@modules/error-handler/interfaces'
import { HttpStatusCode } from '../../constants'
import { AppMiddleware } from './interfaces'

const isClientError = (
  error: Error & { status?: string | number }
): boolean => {
  return Boolean(
    error?.status?.toString().startsWith('4')
  )
}

export const errorHandlerMiddleware: AppMiddleware = () =>
  async function errorHandlerMiddleware (ctx, next) {
    try {
      await next()
    } catch (error) {
      const errorHandler: ErrorHandler = ctx.scope.resolve('errorHandler')
      await errorHandler.handleError(error)

      const clientError = isClientError(error)
      ctx.status = error.status ?? HttpStatusCode.InternalServer

      ctx.body = {
        error: {
          message: clientError ? error.message : 'Internal Server Error',
          meta: clientError ? error.meta : undefined
        },
        ...ctx.body
      }
    }
  }
