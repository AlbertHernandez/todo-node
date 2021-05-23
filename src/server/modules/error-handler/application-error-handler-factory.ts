import { App } from '../../interfaces';
import { ErrorTracker } from '../error-tracker/interfaces';
import { errorHandlerFactory } from './error-handler-factory';
import { ApplicationErrorHandlerFactory } from './interfaces';

export const applicationErrorHandlerFactory: ApplicationErrorHandlerFactory = {
  get(app: App) {
    const errorTracker = app.container.has('errorTracker')
      ? app.container.resolve<ErrorTracker>('errorTracker')
      : undefined;

    return errorHandlerFactory.get({
      errorTracker,
      logger: app.logger,
    });
  },
};
