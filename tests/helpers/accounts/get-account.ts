import { appTestServer } from '../app-test-server';
import { env } from '../../../src/server/config/environment';
import { HttpStatusCode } from '../../../src/server/api/constants';

export const getAccount = async (email: string) => {
  const request = appTestServer.getRequest();
  const response = await request
    .get(`/api/v1/accounts/${email}`)
    .set('api-key', env.apiKey);
  expect(response.status).toBe(HttpStatusCode.Ok);
  return response.body.data;
};
