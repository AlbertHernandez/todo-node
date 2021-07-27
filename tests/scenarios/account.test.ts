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
    const getAccountResponse = await getAccount(testAccount.email);
    expect(getAccountResponse.status).toBe(HttpStatusCode.Ok);
    const account = getAccountResponse.body.data;

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

  test('We can delete the account', async () => {
    const createdAccountResponse = await createAccount(
      testAccount.name,
      testAccount.email,
    );
    expect(createdAccountResponse.status).toBe(HttpStatusCode.Ok);
    const createdAccount = createdAccountResponse.body.data;

    const deletedAccountResponse = await deleteAccount(createdAccount.id);
    expect(deletedAccountResponse.status).toBe(HttpStatusCode.Ok);

    const getAccountResponseDeleted = await getAccount(testAccount.email);
    expect(getAccountResponseDeleted.status).toBe(HttpStatusCode.Ok);
    const accountDeleted = getAccountResponseDeleted.body.data;
    expect(accountDeleted).toMatchObject({});
  });

  test('We can get the account', async () => {
    const createdAccountResponse = await createAccount(
      testAccount.name,
      testAccount.email,
    );
    expect(createdAccountResponse.status).toBe(HttpStatusCode.Ok);

    const getAccountResponse = await getAccount(testAccount.email);
    expect(getAccountResponse.status).toBe(HttpStatusCode.Ok);
    const account = getAccountResponse.body.data;

    expect(account.name).toBe(testAccount.name);
    expect(account.email).toBe(testAccount.email);

    expect(account.id).not.toBeNull();
    expect(typeof account.id).toBe('string');

    expect(account.updatedAt).not.toBeNull();
    expect(typeof account.updatedAt).toBe('string');

    expect(account.createdAt).not.toBeNull();
    expect(typeof account.createdAt).toBe('string');
  });
});
