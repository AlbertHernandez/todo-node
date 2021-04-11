import { Logger } from "../logger/interfaces";
import { BaseError } from "../../errors";
import { ErrorHandler as IErrorHandler } from "./interfaces";
import { ClientError } from "../../api/errors";

export class ErrorHandler implements IErrorHandler {
  private logger: Logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  async handleError(error: Error) {
    this.logError(error);
  }

  logError(error: Error) {
    if (error instanceof ClientError) {
      this.logger.warn({
        msg: error.message,
        context: {
          ip: error.ip,
          status: error.status,
          meta: error.meta,
          code: error.code,
          name: error.name,
        },
      });
      return;
    }

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
      return;
    }

    this.logger.error({
      msg: error.message,
      context: {
        isOperational: false,
        code: "error.generic",
        stack: error.stack,
      },
    });
  }

  isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
