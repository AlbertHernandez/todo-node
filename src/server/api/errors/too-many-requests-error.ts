import { HttpStatusCode } from '../constants'
import { ClientError } from './client-error'

export class TooManyRequestsError extends ClientError {
  constructor (message: string, ip: string, meta?: any) {
    super(
      message,
      ip,
      HttpStatusCode.TooManyRequests,
      true,
      'error.api.tooManyRequestError',
      meta
    )
  }
}
