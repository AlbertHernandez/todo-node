import { App } from '@server/interfaces';
import { Logger } from '@server/modules/logger/interfaces';

export interface MessageClientOptions {
  projectId: string;
  logger: Logger;
  app: App;
}
