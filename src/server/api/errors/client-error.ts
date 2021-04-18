import { HttpStatusCode } from '../enums'
import { HttpError } from './http-error'

export class ClientError extends HttpError {
  ip

  constructor (
    message: string,
    ip: string,
    status: HttpStatusCode = HttpStatusCode.BadRequest,
    isOperational = true,
    code = 'error.api.client',
    meta?: any
  ) {
    super(message, status, isOperational, code, meta)
    this.ip = ip
  }
}
