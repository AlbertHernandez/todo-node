import { App } from 'src/server/interfaces';
import { Logger } from '../../logger/interfaces';
import { MessageClient } from '../../message-client';
import { MessageListenerClientConfig } from './message-listener-client-config-interface';

export interface MessageListenerClientOptions {
  logger: Logger;
  messageClient: MessageClient;
  messageListenerClientConfig: MessageListenerClientConfig;
  app: App;
}
