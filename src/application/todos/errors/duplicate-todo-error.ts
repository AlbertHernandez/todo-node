import { HttpStatusCode } from '../../../server/api/constants';
import { ApplicationError } from '../../errors';

export class DuplicateTodoError extends ApplicationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(
      message,
      HttpStatusCode.NotAcceptable,
      'error.business.duplicateTodoError',
      meta,
    );
  }
}
