import { appTestServer } from '../app-test-server';
import { env } from '../../../src/server/config/environment';

export const getAccount = async (email: string) => {
  const request = appTestServer.getRequest();
  return await request
    .get(`/api/v1/accounts/${email}`)
    .set('api-key', env.apiKey);
};
