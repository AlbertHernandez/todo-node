import * as Awilix from 'awilix';
import { StatusController } from './';

import { AppDependencies } from 'src/server/plugins/interfaces/plugin-interface';

export const registerStatusDependencies: AppDependencies = async ({
  logger,
  container,
}) => {
  logger.trace('Registration of status dependencies...');

  container.register({
    statusController: Awilix.asClass(StatusController),
  });

  logger.trace('Registration of status dependencies completed!');
};
