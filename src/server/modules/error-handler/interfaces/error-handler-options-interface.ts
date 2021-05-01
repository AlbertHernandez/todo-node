import { ErrorTracker } from '../../error-tracker/interfaces'
import { Logger } from '../../logger/interfaces'

export interface ErrorHandlerOptions {
  logger: Logger
  errorTracker?: ErrorTracker
}
