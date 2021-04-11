import { HttpStatusCode } from "../enums";
import { HttpError } from "./http-error";

export class RequestValidationError extends HttpError {
  constructor(message: string, meta?: any) {
    super(
      message,
      HttpStatusCode.BAD_REQUEST,
      true,
      "error.api.validation",
      meta
    );
  }
}
