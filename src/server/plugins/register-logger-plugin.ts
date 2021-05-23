import { Plugin } from './interfaces/plugin-interface';
import { App } from '@server/interfaces';
import * as Awilix from 'awilix';

export class RegisterLoggerPlugin implements Plugin {
  async use(app: App): Promise<void> {
    const applicationLogger = app.logger.child({
      loggerType: 'application',
    });

    applicationLogger.trace('Registration of Application Logger...');

    app.container.register({
      applicationLogger: Awilix.asValue(applicationLogger),
      logger: Awilix.aliasTo('applicationLogger'),
    });

    applicationLogger.trace('Registration of Application Logger completed!');
  }
}
