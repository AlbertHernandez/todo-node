import { BaseError } from "../../errors";
import { HttpStatusCode } from "../enums";

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
