import { Logger } from "../logger/interfaces";
import { BaseError } from "../../errors";
import { ErrorHandler as IErrorHandler } from "./interfaces";

export class ErrorHandler implements IErrorHandler {
  private logger: Logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  async handleError(error: Error) {
    this.logError(error);
  }

  logError(error: Error) {
    if (error instanceof BaseError) {
      this.logger.error({
        msg: error.message,
        context: {
          isOperational: error.isOperational,
          status: error.status,
          meta: error.meta,
          code: error.code,
          name: error.name,
          stack: error.stack,
        },
      });
    } else {
      this.logger.error({
        msg: error.message,
        context: {
          isOperational: false,
          code: "generic.error",
          stack: error.stack,
        },
      });
    }
  }

  isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
