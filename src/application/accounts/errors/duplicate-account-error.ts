import { HttpStatusCode } from '../../../server/api/constants';
import { ApplicationError } from '../../errors';

export class DuplicateAccountError extends ApplicationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(
      message,
      HttpStatusCode.NotAcceptable,
      'error.business.duplicateAccountError',
      meta,
    );
  }
}
