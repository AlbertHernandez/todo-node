import { PubSub, Message as PubSubMessage } from '@google-cloud/pubsub';
import {
  InputMessage,
  OutputMessage,
  MessageClient as IMessageClient,
  MessageClientOptions,
} from './interfaces';

export class MessageClient implements IMessageClient {
  private readonly projectId;
  private client: PubSub | null;
  private readonly logger;
  private readonly app;

  constructor(dependencies: MessageClientOptions) {
    this.logger = dependencies.logger;
    this.projectId = dependencies.projectId;
    this.app = dependencies.app;
    this.client = null;
  }

  async publish(message: InputMessage): Promise<void> {
    this.logger.trace({
      msg: 'Publishing message...',
      context: {
        message,
      },
    });

    try {
      const data = {
        type: message.type,
        attributes: message.attributes,
        meta: {
          requestContext: this.app.container.resolve('requestContext', {
            allowUnregistered: true,
          }),
        },
      };
      const dataBuffer = Buffer.from(JSON.stringify(data));
      const client = this.getClient();
      const topic = client.topic(message.type);

      const messageId = await topic.publish(dataBuffer);
      this.logger.trace({
        msg: 'Message published',
        context: {
          messageId,
          message,
        },
      });
    } catch (error) {
      this.logger.error({
        msg: 'Received error while publishing',
        context: {
          error,
          message,
        },
      });
      throw error;
    }
  }

  subscribe(
    subscriptionName: string,
    processFunc: (message: OutputMessage) => Promise<void>,
  ): void {
    this.logger.trace({
      msg: 'Subscribing to messages...',
      context: {
        subscriptionName,
      },
    });

    try {
      const client = this.getClient();
      const subscription = client.subscription(subscriptionName);

      subscription.on('message', async (pubSubMessage: PubSubMessage) => {
        const rawData = JSON.parse(pubSubMessage.data.toString());
        const message: OutputMessage = {
          data: {
            id: pubSubMessage.id,
            type: rawData.type,
            occurredOn: pubSubMessage.publishTime.toISOString(),
            attributes: rawData.attributes,
            meta: rawData.meta,
          },
        };
        try {
          await processFunc(message);
          pubSubMessage.ack();
        } catch (error) {}
      });
    } catch (error) {
      this.logger.error({
        msg: 'Received error while subscribing',
        context: {
          error,
          subscriptionName,
        },
      });
      throw error;
    }
  }

  getClient(): PubSub {
    if (this.client) {
      return this.client;
    }

    this.client = new PubSub({ projectId: this.projectId });

    return this.client;
  }
}
