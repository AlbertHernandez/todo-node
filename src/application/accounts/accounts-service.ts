import {
  AccountsRepository,
  AccountsService as IAccountsService,
} from './interfaces';
import { Logger } from '@modules/logger/interfaces';
import { Account } from './entities';
import { CreateAccountDto } from './dto';

export class AccountsService implements IAccountsService {
  private readonly accountsRepository;
  private readonly logger;

  constructor(dependencies: {
    accountsRepository: AccountsRepository;
    logger: Logger;
  }) {
    this.accountsRepository = dependencies.accountsRepository;
    this.logger = dependencies.logger;
  }

  async get(email: string): Promise<Account | null> {
    return await this.accountsRepository.get(email);
  }

  async getAll(): Promise<Account[]> {
    return await this.accountsRepository.getAll();
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    this.logger.trace({
      msg: 'Creating an account...',
      context: { createAccountDto },
    });

    const account = await this.accountsRepository.create(createAccountDto);

    this.logger.trace({
      msg: 'Account created successfully',
      context: { account },
    });

    return account;
  }

  async remove(id: string): Promise<void> {
    this.logger.trace({
      msg: 'Removing account...',
      context: {
        id,
      },
    });

    await this.accountsRepository.remove(id);

    this.logger.trace({
      msg: 'Account removed successfully',
      context: {
        id,
      },
    });
  }

  async removeAll(): Promise<void> {
    this.logger.trace('Removing all accounts...');

    await this.accountsRepository.removeAll();

    this.logger.trace('Removed all accounts successfully');
  }
}
