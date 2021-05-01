import { Account } from './account-interface'

export type CreateAccountMethod = (account: Account) => Promise<Account>
