import { ApplicationError } from "../../../application/errors";

export class HttpError extends ApplicationError {
  status: number | string;

  constructor(
    message: string,
    status: number | string = 500,
    code?: string,
    meta?: Record<string, unknown>
  ) {
    super(message, code, meta);

    this.status = status;
  }
}
