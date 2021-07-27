import { HttpStatusCode } from '../../src/server/api/constants';
import { env } from '../../src/server/config/environment';
import { appTestServer } from '../helpers/app-test-server';

describe('Status', () => {
  beforeAll(async () => {
    await appTestServer.startApplication();
  });

  afterAll(() => {
    appTestServer.stopApplication();
  });

  test('Health entrypoint returns ok when api key is correct', async () => {
    const request = appTestServer.getRequest();
    const response = await request.get('/health').set('api-key', env.apiKey);
    expect(response.body.data.health).toBe('Ok');
  });

  test('Health entrypoint returns 401 when api key is wrong', async () => {
    const request = appTestServer.getRequest();
    const response = await request.get('/health').set('api-key', 'asdf');
    expect(response.status).toBe(HttpStatusCode.Unauthorized);
  });
});
