import * as Awilix from 'awilix';

import { Plugin } from './interfaces/plugin-interface';
import { App } from '../interfaces';
import { MessageListenerClient } from '../modules/message-listener-client';
import { MessageListenerClientConfig } from '../modules/message-listener-client/interfaces';

export class MessageListenerClientPlugin implements Plugin {
  private readonly messageListenerClientConfig;
  private readonly enabled;

  constructor(dependencies: {
    messageListenerClientConfig: MessageListenerClientConfig;
    enabled: boolean;
  }) {
    this.messageListenerClientConfig = dependencies.messageListenerClientConfig;
    this.enabled = dependencies.enabled;
  }

  async use(app: App): Promise<void> {
    app.logger.trace('Starting Message Listener Client Plugin...');

    app.container.register({
      messageListenerClient: Awilix.asClass(MessageListenerClient)
        .inject(() => ({
          messageListenerClientConfig: this.messageListenerClientConfig,
        }))
        .setLifetime(Awilix.Lifetime.SINGLETON),
    });

    if (this.enabled) {
      const messageListenerClient: MessageListenerClient = app.container.resolve(
        'messageListenerClient',
      );

      messageListenerClient.startSubscriptions();
    } else {
      app.logger.trace('Subscriptions are disabled!');
    }

    app.logger.trace('Finalization Message Listener Client Plugin!');
  }
}
