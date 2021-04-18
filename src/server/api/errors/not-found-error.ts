import { HttpStatusCode } from '../enums'
import { ClientError } from './client-error'

export class NotFoundError extends ClientError {
  constructor (message: string, ip: string, meta?: any) {
    super(
      message,
      ip,
      HttpStatusCode.NotFound,
      true,
      'error.api.notFound',
      meta
    )
  }
}
