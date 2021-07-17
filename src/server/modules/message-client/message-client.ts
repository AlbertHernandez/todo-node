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

  constructor(dependencies: MessageClientOptions) {
    this.logger = dependencies.logger;
    this.projectId = dependencies.projectId;
    this.client = null;
  }

  async publish(topicName: string, message: InputMessage): Promise<void> {
    this.logger.trace({
      msg: 'Publishing message...',
      context: {
        topicName,
        message,
      },
    });

    try {
      const dataBuffer = Buffer.from(JSON.stringify(message.payload));
      const client = this.getClient();
      const topic = client.topic(topicName);

      const messageId = await topic.publish(dataBuffer);
      this.logger.trace({
        msg: 'Message published',
        context: {
          messageId: messageId,
          topicName,
          message,
        },
      });
    } catch (error) {
      this.logger.error({
        msg: 'Received error while publishing',
        context: {
          error,
          topicName,
          message,
        },
      });
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
        const { id, publishTime } = pubSubMessage;

        const message: OutputMessage = {
          payload: JSON.parse(pubSubMessage.data.toString()),
          metadata: {
            messageId: id,
            publishTime: publishTime.toISOString(),
          },
        };

        await processFunc(message);
        pubSubMessage.ack();
      });
    } catch (error) {
      this.logger.error({
        msg: 'Received error while subscribing',
        context: {
          error,
          subscriptionName,
        },
      });
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
