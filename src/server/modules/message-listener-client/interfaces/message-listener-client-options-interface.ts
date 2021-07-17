import { App } from '@server/interfaces';
import { ErrorHandler } from '@server/modules/error-handler/interfaces';
import { Logger } from '@server/modules/logger/interfaces';
import { MessageClient } from '@server/modules/message-client';
import { MessageListenerClientConfig } from './message-listener-client-config-interface';

export interface MessageListenerClientOptions {
  logger: Logger;
  errorHandler: ErrorHandler;
  messageClient: MessageClient;
  messageListenerClientConfig: MessageListenerClientConfig;
  app: App;
}
