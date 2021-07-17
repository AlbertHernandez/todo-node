import * as Awilix from 'awilix';

import { Plugin } from './interfaces/plugin-interface';
import { App } from '@server/interfaces';
import { MessageClient } from '@server/modules/message-client';

export class MessageClientPlugin implements Plugin {
  private readonly projectId;

  constructor(dependencies: { projectId: string }) {
    this.projectId = dependencies.projectId;
  }

  async use(app: App): Promise<void> {
    app.logger.trace('Starting Message Client Plugin...');

    app.container.register({
      messageClient: Awilix.asClass(MessageClient).inject(() => ({
        projectId: this.projectId,
      })),
    });

    app.logger.trace('Finalization Message Client Plugin!');
  }
}
