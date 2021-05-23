import { Plugin } from './interfaces/plugin-interface';
import { App } from '@server/interfaces';

export class SubscribeErrorPlugin implements Plugin {
  async use(app: App): Promise<void> {
    app.logger.trace('Subscribe errors plugin...');

    process.on('unhandledRejection', (reason: Error) => {
      throw reason;
    });

    process.on('uncaughtException', (error: Error) => {
      app.errorHandler.handleError(error);
      if (!app.errorHandler.isTrustedError(error)) {
        process.exit(1);
      }
    });

    app.logger.trace('Subscribe errors plugin Completed!');
  }
}
