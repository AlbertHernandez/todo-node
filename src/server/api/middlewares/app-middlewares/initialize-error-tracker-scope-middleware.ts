import { AppMiddleware } from './interfaces'
import { ErrorTracker } from '../../../modules/error-tracker/interfaces'

export const initializeErrorTrackerScopeMiddleware: AppMiddleware = (app) =>
  async function initializeErrorTrackerScopeMiddleware (ctx, next) {
    const errorTracker: ErrorTracker = app.container.resolve('errorTracker')
    errorTracker.configureRequestScope(ctx)

    await next()
  }
