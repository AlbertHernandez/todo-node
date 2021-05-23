import { Plugin } from './interfaces/plugin-interface';
import { App } from '@server/interfaces';
import * as Awilix from 'awilix';

export class RegisterErrorHandlerPlugin implements Plugin {
  async use(app: App): Promise<void> {
    app.logger.trace('Registration of Application Error Handler...');

    app.container.register({
      applicationErrorHandler: Awilix.asValue(app.errorHandler),
      errorHandler: Awilix.aliasTo('applicationErrorHandler'),
    });

    app.logger.trace('Registration of Application Error Handler completed!');
  }
}
