import { HttpStatusCode } from "../../server/api/types";
import { BaseError } from "./base-error";

export class ApplicationError extends BaseError {
  constructor(
    message: string,
    status: HttpStatusCode,
    code?: string,
    meta?: Record<string, unknown>
  ) {
    super(message, status, true, code || "error.application.unexpected", meta);
  }
}
