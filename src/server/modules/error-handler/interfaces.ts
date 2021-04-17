import { App } from "../../interfaces";
import { Logger } from "../logger/interfaces";

export interface ErrorHandler {
  handleError: (error: Error) => Promise<void>;
  isTrustedError: (error: Error) => boolean;
}

export interface ApplicationErrorHandler {
  createErrorHandler(app: App): ErrorHandler;
}

export interface ErrorHandlerOptions {
  logger: Logger;
}
