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
import { ErrorHandler } from '../error-handler/interfaces';
import { ErrorTracker } from '../error-tracker/interfaces';
import * as Sentry from '@sentry/node';

export class MessageListenerClient implements IMessageListenerClient {
  private readonly logger;
  private readonly messageClient;
  private readonly messageListenerClientConfig;
  private readonly app: App;

  constructor(dependencies: MessageListenerClientOptions) {
    this.logger = dependencies.logger;
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
            await this.onMessage(message, subscriptionName, handlerClass);
          },
        );
      },
    );

    this.logger.trace('Subscriptions ready!');
  }

  private async onMessage(
    message: OutputMessage,
    subscriptionName: string,
    handlerClass: string,
  ) {
    const eventScope = this.configureEventScope(
      message,
      handlerClass,
      subscriptionName,
    );

    const scopedLogger: Logger = eventScope.resolve('scopedLogger');

    try {
      scopedLogger.trace({
        msg: 'Handling Message...',
        context: {
          message,
          subscriptionName,
          handlerClass,
        },
      });
      const messageListenerClassHandler: MessageListenerClassHandler = eventScope.resolve(
        handlerClass,
      );
      await messageListenerClassHandler.handleMessage(message);

      scopedLogger.trace('Message handled successfully');
    } catch (error) {
      scopedLogger.error('Received error while processing message');
      const scopedErrorHandler: ErrorHandler = eventScope.resolve(
        'errorHandler',
      );
      await scopedErrorHandler.handleError(error);
      throw error;
    }
  }

  private configureEventScope(
    message: OutputMessage,
    handlerClass: string,
    subscriptionName: string,
  ) {
    const requestId = generateUuid();

    const eventScope = createScope(this.app.container, {
      loggerType: 'event',
      requestId,
    });

    this.app.container.register({
      requestContext: Awilix.asValue({
        requestId,
      }),
    });

    const scopedErrorTracker: ErrorTracker = eventScope.resolve('errorTracker');

    scopedErrorTracker.configureScope((scope: Sentry.Scope) => {
      scope.setContext('Request', {
        requestId,
      });

      scope.setContext('Event', {
        message: JSON.stringify(message, null, 2),
        handlerClass,
        subscriptionName,
      });

      scope.setTag('Type', 'Event');
    });

    return eventScope;
  }
}
