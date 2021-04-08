import { BaseError } from "../../application/errors";

export class HttpError extends BaseError {
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
