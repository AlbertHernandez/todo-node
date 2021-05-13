import { Account } from '../entities'

export type CreateAccountMethod = (account: Account) => Promise<Account>
