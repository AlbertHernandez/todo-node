import { HttpStatusCode } from "../enums";
import { ClientError } from "./client-error";

export class RequestValidationError extends ClientError {
  constructor(message: string, ip: string, meta?: any) {
    super(
      message,
      ip,
      HttpStatusCode.TooManyRequests,
      true,
      "error.api.tooManyRequests",
      meta
    );
  }
}
