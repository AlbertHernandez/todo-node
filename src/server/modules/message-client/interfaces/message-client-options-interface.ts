import { App } from 'src/server/interfaces';
import { Logger } from 'src/server/modules/logger/interfaces';

export interface MessageClientOptions {
  projectId: string;
  logger: Logger;
  app: App;
}
