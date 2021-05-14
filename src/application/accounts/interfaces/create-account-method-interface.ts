import { Account } from '../entities'
import { CreateAccountDto } from '@application/accounts/dto'

export type CreateAccountMethod = (createAccountDto: CreateAccountDto) => Promise<Account>
