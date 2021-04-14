import { HttpStatusCode } from "../../../server/api/enums";
import { ApplicationError } from "../../errors";

export class TodoNotFoundError extends ApplicationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(
      message,
      HttpStatusCode.NotAcceptable,
      "error.business.todoNotFound",
      meta
    );
  }
}
