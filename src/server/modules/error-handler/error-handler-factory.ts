import { ErrorHandler } from "./error-handler";
import { ErrorHandlerOptions } from "./interfaces";

export const errorHandlerFactory = {
  get(options: ErrorHandlerOptions) {
    return new ErrorHandler({
      logger: options.logger,
    });
  },
};
