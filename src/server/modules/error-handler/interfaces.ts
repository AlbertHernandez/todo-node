import { App } from "../../interfaces";

export interface ErrorHandler {
  handleError: (error: Error) => Promise<void>;
  isTrustedError: (error: Error) => boolean;
}

export interface ApplicationErrorHandler {
  createErrorHandler(app: App): ErrorHandler;
}
