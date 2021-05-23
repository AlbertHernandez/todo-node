import { Account } from '../entities/account-entity';

export type GetAllAccountsMethod = () => Promise<Account[]>;
