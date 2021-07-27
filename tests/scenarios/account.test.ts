import _ from 'lodash';
import { createAccount, deleteAccount, getAccount } from '../helpers/accounts';
import { HttpStatusCode } from '../../src/server/api/constants';
import { appTestServer } from '../helpers/app-test-server';

describe('Account', () => {
  const testAccount = {
    name: 'Test',
    email: 'test@gmail.com',
  };

  beforeAll(async () => {
    await appTestServer.startApplication();
  });

  afterAll(async () => {
    appTestServer.stopApplication();
  });

  beforeEach(async () => {
    const account = await getAccount(testAccount.email);
    if (!_.isEmpty(account)) {
      const deleteAccountResponse = await deleteAccount(account.id);
      expect(deleteAccountResponse.status).toBe(HttpStatusCode.Ok);
    }
  });

  test('We can create accounts', async () => {
    const createdAccountResponse = await createAccount(
      testAccount.name,
      testAccount.email,
    );

    expect(createdAccountResponse.status).toBe(HttpStatusCode.Ok);
    const createdAccount = createdAccountResponse.body.data;

    expect(createdAccount.id).not.toBeNull();
    expect(typeof createdAccount.id).toBe('string');

    expect(createdAccount.name).toBe(testAccount.name);
    expect(createdAccount.email).toBe(testAccount.email);

    expect(createdAccount.createdAt).not.toBeNull();
    expect(typeof createdAccount.createdAt).toBe('string');

    expect(createdAccount.updatedAt).not.toBeNull();
    expect(typeof createdAccount.updatedAt).toBe('string');
  });

  test('We cannot create accounts with the same email', async () => {
    const createdAccountResponse = await createAccount(
      testAccount.name,
      testAccount.email,
    );
    expect(createdAccountResponse.status).toBe(HttpStatusCode.Ok);

    const createdAccountResponseRepeted = await createAccount(
      testAccount.name,
      testAccount.email,
    );
    expect(createdAccountResponseRepeted.status).toBe(
      HttpStatusCode.NotAcceptable,
    );
    const { error } = createdAccountResponseRepeted.body;
    expect(error.message).toBe('Duplicated account');
    expect(error.meta.duplicateKey.email).toBe(testAccount.email);
    expect(error.meta.createAccountDto).toEqual({
      email: testAccount.email,
      name: testAccount.name,
    });
  });
});
