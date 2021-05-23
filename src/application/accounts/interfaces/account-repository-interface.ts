import { CreateAccountMethod } from './create-account-method-interface';
import { RemoveAllAccountsMethod } from './remove-all-accounts-method-interface';
import { RemoveAccountMethod } from './remove-account-method-method-interface';
import { GetAccountsMethod } from './get-accounts-method-interface';
import { GetAllAccountsMethod } from './get-all-accounts-method-interface';

export interface AccountsRepository {
  get: GetAccountsMethod;
  getAll: GetAllAccountsMethod;
  create: CreateAccountMethod;
  remove: RemoveAccountMethod;
  removeAll: RemoveAllAccountsMethod;
}
