import { aliasTo, asValue, AwilixContainer } from "awilix";
import { ILogger } from "../../logger/interfaces";

export const createScope = (
  container: AwilixContainer,
  scopeLoggerInfo?: Record<string, unknown>
) => {
  const scope = container.createScope();
  const parentLogger = container.resolve<ILogger>("applicationLogger");

  scope.register({
    scopedLogger: asValue(parentLogger.child(scopeLoggerInfo)),
    logger: aliasTo("scopedLogger"),
  });

  return scope;
};
