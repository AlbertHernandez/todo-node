import { Logger } from '@modules/logger/interfaces'
import { AppMiddleware } from './interfaces'

export const logRequestMiddleware: AppMiddleware = () =>
  async function logRequestMiddleware (ctx, next) {
    const logger: Logger = ctx.scope.resolve('logger')

    try {
      logger.debug({
        msg: 'Incoming Request',
        context: {
          method: ctx.request.method,
          url: ctx.url,
          header: ctx.header,
          body: ctx.request.body
        }
      })
      await next()
    } finally {
      logger.debug({
        msg: 'Finishing Request',
        context: {
          body: ctx.body,
          status: ctx.status
        }
      })
    }
  }
