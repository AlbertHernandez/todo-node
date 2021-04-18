import { ApplicationErrorHandlerFactory } from './interfaces'
import { App } from '../../interfaces'
import { errorHandlerFactory } from './error-handler-factory'
import { ErrorTracker } from '../error-tracker/interfaces'

export const applicationErrorHandlerFactory: ApplicationErrorHandlerFactory = {
  get (app: App) {
    const errorTracker = app.container.has('errorTracker')
      ? app.container.resolve<ErrorTracker>('errorTracker')
      : undefined

    return errorHandlerFactory.get({
      errorTracker,
      logger: app.logger
    })
  }
}
