import { Account } from '../entities';

export type GetAccountsMethod = (email: string) => Promise<Account | null>;
