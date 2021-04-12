import { ApplicationErrorHandler } from "./interfaces";
import { ErrorHandler } from "./error-handler";
import { Logger } from "../logger/interfaces";

export const applicationErrorHandler: ApplicationErrorHandler = {
  createErrorHandler(logger: Logger) {
    return new ErrorHandler({
      logger,
    });
  },
};
