import { Account } from '../entities';
import { CreateAccountDto } from 'src/application/accounts/dto';

export type CreateAccountMethod = (
  createAccountDto: CreateAccountDto,
) => Promise<Account>;
