import { BaseError } from '../../errors'
import {
  ErrorHandler as IErrorHandler,
  ErrorHandlerOptions
} from './interfaces'
import { ClientError, TooManyRequestsError } from '../../api/errors'
import { ApplicationError } from '../../../application/errors'

export class ErrorHandler implements IErrorHandler {
  private readonly logger
  private readonly errorTracker?

  constructor (dependencies: ErrorHandlerOptions) {
    this.logger = dependencies.logger
    this.errorTracker = dependencies.errorTracker
  }

  async handleError (error: Error): Promise<void> {
    this.logError(error)

    if (this.errorTracker != null) {
      await this.errorTracker.trackError(error)
    }
  }

  logError (error: Error): void {
    if (error instanceof TooManyRequestsError) {
      this.logger.warn({
        msg: error.message,
        context: {
          isOperational: error.isOperational,
          ip: error.ip,
          status: error.status,
          meta: error.meta,
          code: error.code,
          name: error.name
        }
      })
      return
    }

    if (error instanceof ClientError) {
      this.logger.trace({
        msg: error.message,
        context: {
          isOperational: error.isOperational,
          ip: error.ip,
          status: error.status,
          meta: error.meta,
          code: error.code,
          name: error.name
        }
      })
      return
    }

    if (error instanceof ApplicationError) {
      this.logger.warn({
        msg: error.message,
        context: {
          isOperational: error.isOperational,
          status: error.status,
          meta: error.meta,
          code: error.code,
          name: error.name,
          stack: error.stack
        }
      })
      return
    }

    if (error instanceof BaseError) {
      this.logger.error({
        msg: error.message,
        context: {
          isOperational: error.isOperational,
          status: error.status,
          meta: error.meta,
          code: error.code,
          name: error.name,
          stack: error.stack
        }
      })
      return
    }

    this.logger.error({
      msg: error.message,
      context: {
        isOperational: false,
        code: 'error.generic',
        stack: error.stack
      }
    })
  }

  isTrustedError (error: Error): boolean {
    if (error instanceof BaseError) {
      return error.isOperational
    }
    return false
  }
}
