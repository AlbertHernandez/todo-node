import { Logger } from 'src/server/modules/logger/interfaces';
import { EmailService as IEmailService } from './interfaces';

export class EmailService implements IEmailService {
  private readonly logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  async sendEmail(message: string): Promise<void> {
    this.logger.trace({
      msg: 'Sending email...',
      context: {
        message,
      },
    });
  }
}
