import { HttpStatusCode } from "../../../server/api/types";
import { ApplicationError } from "../../errors";

export class AccountNotFoundError extends ApplicationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(
      message,
      HttpStatusCode.NOT_ACCEPTABLE,
      "error.business.accountNotFound",
      meta
    );
  }
}
