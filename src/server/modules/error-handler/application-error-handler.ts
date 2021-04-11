import { ApplicationErrorHandler } from "./interfaces";
import { ErrorHandler } from "./error-handler";

export const applicationErrorHandler: ApplicationErrorHandler = {
  createErrorHandler(app) {
    return new ErrorHandler({
      logger: app.logger,
    });
  },
};
