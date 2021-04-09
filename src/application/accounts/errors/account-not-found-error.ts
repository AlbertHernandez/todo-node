import { ApplicationError } from "../../errors/application-error";

export class AccountNotFoundError extends ApplicationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, 406, "error.business.accountNotFound", meta);
  }
}