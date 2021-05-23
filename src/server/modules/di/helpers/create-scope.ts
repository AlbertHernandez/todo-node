import * as Awilix from 'awilix';
import { Logger } from '../../logger/interfaces';
import { errorHandlerFactory } from '../../error-handler';
import { ErrorTracker } from '../../error-tracker/interfaces';

export const createScope = (
  container: Awilix.AwilixContainer,
  scopeLoggerInfo?: Record<string, unknown>,
): Awilix.AwilixContainer<any> => {
  const scope = container.createScope();
  const applicationLogger = container.resolve<Logger>('applicationLogger');
  const errorTracker = container.has('errorTracker')
    ? container.resolve<ErrorTracker>('errorTracker')
    : undefined;

  const scopedLogger = applicationLogger.child(scopeLoggerInfo);
  const scopedErrorHandler = errorHandlerFactory.get({
    errorTracker,
    logger: scopedLogger,
  });

  scope.register({
    scopedLogger: Awilix.asValue(scopedLogger),
    logger: Awilix.aliasTo('scopedLogger'),
    scopedErrorHandler: Awilix.asValue(scopedErrorHandler),
    errorHandler: Awilix.aliasTo('scopedErrorHandler'),
  });

  return scope;
};
