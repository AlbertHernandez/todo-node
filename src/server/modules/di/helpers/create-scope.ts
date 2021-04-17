import * as Awilix from "awilix";
import { Logger } from "../../logger/interfaces";
import { errorHandlerFactory } from "../../error-handler";

export const createScope = (
  container: Awilix.AwilixContainer,
  scopeLoggerInfo?: Record<string, unknown>
) => {
  const scope = container.createScope();
  const applicationLogger = container.resolve<Logger>("applicationLogger");

  const scopedLogger = applicationLogger.child(scopeLoggerInfo);
  const scopedErrorHandler = errorHandlerFactory.get({
    logger: scopedLogger,
  });

  scope.register({
    scopedLogger: Awilix.asValue(scopedLogger),
    logger: Awilix.aliasTo("scopedLogger"),
    scopedErrorHandler: Awilix.asValue(scopedErrorHandler),
    errorHandler: Awilix.aliasTo("scopedErrorHandler"),
  });

  return scope;
};
