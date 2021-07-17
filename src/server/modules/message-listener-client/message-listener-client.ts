import * as Awilix from 'awilix';
import { generateUuid } from '@application/common/helpers';
import { App } from '@server/interfaces';
import { createScope } from '../di/helpers';
import { OutputMessage } from '../message-client/interfaces';
import {
  MessageListenerClassHandler,
  MessageListenerClient as IMessageListenerClient,
  MessageListenerClientOptions,
} from './interfaces';
import { Logger } from '../logger/interfaces';

export class MessageListenerClient implements IMessageListenerClient {
  private readonly logger;
  private readonly errorHandler;
  private readonly messageClient;
  private readonly messageListenerClientConfig;
  private readonly app: App;

  constructor(dependencies: MessageListenerClientOptions) {
    this.logger = dependencies.logger;
    this.errorHandler = dependencies.errorHandler;
    this.messageClient = dependencies.messageClient;
    this.messageListenerClientConfig = dependencies.messageListenerClientConfig;
    this.app = dependencies.app;
  }

  startSubscriptions(): void {
    this.logger.trace({
      msg: 'Starting subscriptions...',
      context: {
        messageListenerClientConfig: this.messageListenerClientConfig,
      },
    });

    this.messageListenerClientConfig.forEach(
      (messageListenerClientConfigItem) => {
        const {
          subscriptionName,
          handlerClass,
        } = messageListenerClientConfigItem;

        this.messageClient.subscribe(
          subscriptionName,
          async (message: OutputMessage) => {
            const requestId = generateUuid();
            const scope = createScope(this.app.container, {
              loggerType: 'event',
              requestId,
            });

            this.app.container.register({
              requestContext: Awilix.asValue({
                requestId,
              }),
            });

            const scopedLogger: Logger = scope.resolve('logger');
            scopedLogger.trace({
              msg: 'Handling Message...',
              context: {
                message,
                subscriptionName,
                handlerClass,
              },
            });
            try {
              const messageListenerClassHandler: MessageListenerClassHandler = scope.resolve(
                handlerClass,
              );

              await messageListenerClassHandler.handleMessage(message);
              scopedLogger.trace('Message handled successfully');
            } catch (error) {
              scopedLogger.error({
                msg: `Error when handling message subscription`,
                context: {
                  error,
                },
              });
              this.errorHandler.handleError(error);
              throw error;
            }
          },
        );
      },
    );

    this.logger.trace('Subscriptions ready!');
  }
}
