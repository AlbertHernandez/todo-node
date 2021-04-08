import { aliasTo, asValue, AwilixContainer } from "awilix";
import { ILogger } from "../../logger/interfaces";

export const createScope = (
  container: AwilixContainer,
  scopeLoggerInfo?: Record<string, unknown>
) => {
  const scope = container.createScope();
  const applicationLogger = container.resolve<ILogger>("applicationLogger");

  const scopedLogger = applicationLogger.child(scopeLoggerInfo);

  scope.register({
    scopedLogger: asValue(scopedLogger),
    logger: aliasTo("scopedLogger"),
  });

  return scope;
};
