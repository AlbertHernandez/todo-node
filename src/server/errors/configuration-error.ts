import { HttpStatusCode } from '../api/enums'
import { BaseError } from './base-error'

export class ConfigurationError extends BaseError {
  constructor (
    message: string,
    code?: string,
    status: HttpStatusCode = HttpStatusCode.NotImplemented,
    isOperational = false,
    meta?: Record<string, unknown>
  ) {
    super(
      message,
      status,
      isOperational,
      code ?? 'error.configuration.unexpected',
      meta
    )
  }
}
