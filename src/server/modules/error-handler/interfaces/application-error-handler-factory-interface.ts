import { App } from '../../../interfaces'
import { ErrorHandler } from './error-handler-interface'

export interface ApplicationErrorHandlerFactory {
  get: (app: App) => ErrorHandler
}
