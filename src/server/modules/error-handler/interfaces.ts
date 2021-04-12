import { Logger } from "../logger/interfaces";

export interface ErrorHandler {
  handleError: (error: Error) => Promise<void>;
  isTrustedError: (error: Error) => boolean;
}

export interface ApplicationErrorHandler {
  createErrorHandler(logger: Logger): ErrorHandler;
}
