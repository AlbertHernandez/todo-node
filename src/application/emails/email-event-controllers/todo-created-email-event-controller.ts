import { Logger } from '../../../server/modules/logger/interfaces';
import { MessageListenerClassHandler } from '../../../server/modules/message-listener-client/interfaces';
import { OutputMessage } from '../../../server/modules/message-client/interfaces';
import { Todo } from '../../todos/entities';
import { EmailService } from '../interfaces';

export class TodoCreatedEmailEventController
  implements MessageListenerClassHandler {
  private readonly logger;
  private readonly emailService;

  constructor(dependencies: { logger: Logger; emailService: EmailService }) {
    this.logger = dependencies.logger;
    this.emailService = dependencies.emailService;
  }

  async handleMessage(message: OutputMessage): Promise<void> {
    const todoCreated: Todo = message.data.attributes;

    await this.emailService.sendEmail(`Title: ${todoCreated.title}`);
  }
}
