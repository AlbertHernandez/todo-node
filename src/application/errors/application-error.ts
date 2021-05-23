import { HttpStatusCode } from '../../server/api/constants';
import { BaseError } from '../../server/errors';

export class ApplicationError extends BaseError {
  constructor(
    message: string,
    status: HttpStatusCode,
    code?: string,
    meta?: Record<string, unknown>,
  ) {
    super(message, status, true, code ?? 'error.application.unexpected', meta);
  }
}
