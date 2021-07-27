import supertest from 'supertest';
import { App as IApp } from '../../../src/server/interfaces';
import { startApplication } from '../../../src/start-application';

export class AppTestServer {
  private server: IApp | undefined;
  private request: supertest.SuperTest<supertest.Test> | undefined;

  async startApplication(): Promise<void> {
    this.server = await startApplication();
    this.request = supertest(this.server.app.callback());
  }

  stopApplication(): void {
    if (this.server) {
      this.server.close();
    }
  }

  getRequest(): supertest.SuperTest<supertest.Test> {
    if (!this.request) {
      throw new Error(
        'No request, we should start application before call this method',
      );
    }

    return this.request;
  }
}
