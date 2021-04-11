import * as Awilix from "awilix";
import { Logger } from "../../logger/interfaces";

export const createScope = (
  container: Awilix.AwilixContainer,
  scopeLoggerInfo?: Record<string, unknown>
) => {
  const scope = container.createScope();
  const applicationLogger = container.resolve<Logger>("applicationLogger");

  const scopedLogger = applicationLogger.child(scopeLoggerInfo);

  scope.register({
    scopedLogger: Awilix.asValue(scopedLogger),
    logger: Awilix.aliasTo("scopedLogger"),
  });

  return scope;
};
