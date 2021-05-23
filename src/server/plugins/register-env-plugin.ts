import { Plugin } from './interfaces/plugin-interface';
import { App } from '@server/interfaces';
import * as Awilix from 'awilix';

export class RegisterEnvPlugin implements Plugin {
  env;

  constructor(dependencies: { env: any }) {
    this.env = dependencies.env;
  }

  async use(app: App): Promise<void> {
    app.logger.trace('Registration of env...');

    app.container.register({
      env: Awilix.asValue(this.env),
    });

    app.logger.trace('Registration of env completed!');
  }
}
