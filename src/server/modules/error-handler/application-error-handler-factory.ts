import { ApplicationErrorHandlerFactory } from "./interfaces";
import { App } from "../../interfaces";
import { errorHandlerFactory } from "./error-handler-factory";

export const applicationErrorHandlerFactory: ApplicationErrorHandlerFactory = {
  get(app: App) {
    return errorHandlerFactory.get({
      logger: app.logger,
    });
  },
};
