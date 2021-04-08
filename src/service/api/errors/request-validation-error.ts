import { HttpError } from "./http-error";

export class RequestValidationError extends HttpError {
  constructor(message: string, meta?: any) {
    super(message, 400, "error.api.validation", meta);
  }
}
