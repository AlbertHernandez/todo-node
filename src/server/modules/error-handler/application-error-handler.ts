import { ApplicationErrorHandler } from "./interfaces";
import { App } from "../../interfaces";
import { errorHandlerFactory } from "./error-handler-factory";

export const applicationErrorHandler: ApplicationErrorHandler = {
  createErrorHandler(app: App) {
    return errorHandlerFactory.get({
      logger: app.logger,
    });
  },
};
