import { HttpStatusCode } from '../constants'
import { ClientError } from './client-error'

export class BadRequestError extends ClientError {
  constructor (message: string, ip: string, meta?: any) {
    super(
      message,
      ip,
      HttpStatusCode.BadRequest,
      true,
      'error.api.notAcceptable',
      meta
    )
  }
}
