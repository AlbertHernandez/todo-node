import { AppDependencies, Plugin } from './interfaces/plugin-interface';
import { App } from '@server/interfaces';

export class AppDependenciesPlugin implements Plugin {
  appDependencies;

  constructor(dependencies: { appDependencies: AppDependencies[] }) {
    this.appDependencies = dependencies.appDependencies;
  }

  async use(app: App): Promise<void> {
    app.logger.trace('Registration of application dependencies...');

    for (const appDependency of this.appDependencies) {
      await appDependency(app);
    }

    app.logger.trace('Registration of application dependencies completed!');
  }
}
