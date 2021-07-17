import * as Awilix from 'awilix';
import { TodoCreatedEmailEventController, EmailService } from './';

import { AppDependencies } from '@plugins/interfaces/plugin-interface';

export const registerEmailDependencies: AppDependencies = async ({
  logger,
  container,
}) => {
  logger.trace('Registration of email dependencies...');

  container.register({
    todoCreatedEmailEventController: Awilix.asClass(
      TodoCreatedEmailEventController,
    ),
    emailService: Awilix.asClass(EmailService),
  });

  logger.trace('Registration of email dependencies completed!');
};
