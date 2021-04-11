import { IErrorHandler } from "../../../application/errors/interfaces";
import { ILogger } from "../logger/interfaces";
import { BaseError } from "../../../application/errors/base-error";

export class ErrorHandler implements IErrorHandler {
  private logger: ILogger;

  constructor(dependencies: { logger: ILogger }) {
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
