import { Plugin } from './interfaces/plugin-interface';
import { connectMongo } from '@modules/mongo';
import { App } from '@server/interfaces';

export class MongoPlugin implements Plugin {
  url;

  constructor(dependencies: { url: string }) {
    this.url = dependencies.url;
  }

  async use(app: App): Promise<void> {
    app.logger.trace('Starting Mongo Plugin...');

    await connectMongo(app.logger, this.url);

    app.logger.trace('Finalization Mongo Plugin!');
  }
}
