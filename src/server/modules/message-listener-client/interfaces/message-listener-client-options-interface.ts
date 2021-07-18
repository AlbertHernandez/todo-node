import { App } from '@server/interfaces';
import { Logger } from '@server/modules/logger/interfaces';
import { MessageClient } from '@server/modules/message-client';
import { MessageListenerClientConfig } from './message-listener-client-config-interface';

export interface MessageListenerClientOptions {
  logger: Logger;
  messageClient: MessageClient;
  messageListenerClientConfig: MessageListenerClientConfig;
  app: App;
}
