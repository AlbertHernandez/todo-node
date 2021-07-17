import { Plugin } from './interfaces/plugin-interface';
import { App } from '@server/interfaces';
import * as Awilix from 'awilix';

export class RegisterAppPlugin implements Plugin {
  async use(app: App): Promise<void> {
    app.logger.trace('Registration of application...');

    app.container.register({
      app: Awilix.asValue(app),
    });

    app.logger.trace('Registration of application completed!');
  }
}
