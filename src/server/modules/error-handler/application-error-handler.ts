import { IApp } from "../../interfaces";
import { IErrorHandler } from "./interfaces";
import { ApplicationErrorHandler } from "./types";
import { ErrorHandler } from "./error-handler";

export const applicationErrorHandler: ApplicationErrorHandler = {
  createErrorHandler(app: IApp): IErrorHandler {
    return new ErrorHandler({
      logger: app.logger,
    });
  },
};
