import { BaseError } from "../../../application/errors/base-error";
import { HttpStatusCode } from "../types";

export class HttpError extends BaseError {
  constructor(
    message: string,
    status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    code?: string,
    meta?: Record<string, unknown>
  ) {
    super(message, status, isOperational, code || "error.api.unexpected", meta);
  }
}
