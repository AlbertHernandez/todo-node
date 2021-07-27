import { appTestServer } from '../app-test-server';
import { env } from '../../../src/server/config/environment';

export const createAccount = async (name: string, email: string) => {
  const request = appTestServer.getRequest();
  return await request
    .post(`/api/v1/accounts`)
    .send({
      name,
      email,
    })
    .set('api-key', env.apiKey);
};
