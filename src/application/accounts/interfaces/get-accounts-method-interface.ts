import { Account } from './account-interface'

export type GetAccountsMethod = (email: string) => Promise<Account | null>
