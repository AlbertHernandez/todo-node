import { AppMiddleware } from './interfaces'
import { ApiUser } from '../../interfaces'
import { ErrorTracker, RequestScope } from '../../../modules/error-tracker/interfaces'

export const initializeErrorTrackerScopeMiddleware: AppMiddleware = (app) =>
  async function initializeErrorTrackerScopeMiddleware (ctx, next) {
    const { requestId } = ctx.scope.resolve('requestContext')
    const user: ApiUser | null = ctx?.session?.user

    const requestScope: RequestScope = {
      request: {
        ...ctx.request,
        headers: {
          ...ctx.request.headers,
          'api-key': undefined
        }
      },
      user: {
        ip: ctx.ip,
        name: user?.name,
        type: user?.type
      },
      context: {
        requestId
      }
    }
    const errorTracker: ErrorTracker = app.container.resolve('errorTracker')
    errorTracker.configureRequestScope(requestScope)

    await next()
  }
