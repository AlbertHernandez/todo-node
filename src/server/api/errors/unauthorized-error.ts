import { HttpStatusCode } from '../constants';
import { ClientError } from './client-error';

export class UnauthorizedError extends ClientError {
  constructor(message: string, ip: string, meta?: any) {
    super(
      message,
      ip,
      HttpStatusCode.Unauthorized,
      true,
      'error.api.unauthorized',
      meta,
    );
  }
}
