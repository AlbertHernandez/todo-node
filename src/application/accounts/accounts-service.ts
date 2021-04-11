import {
  Account,
  AccountsRepository,
  AccountsService as IAccountsService,
} from "./interfaces";

export class AccountsService implements IAccountsService {
  private accountsRepository: AccountsRepository;

  constructor(dependencies: { accountsRepository: AccountsRepository }) {
    this.accountsRepository = dependencies.accountsRepository;
  }

  async get(email: string): Promise<Account | null> {
    return await this.accountsRepository.get(email);
  }

  async getAll(): Promise<Account[]> {
    return await this.accountsRepository.getAll();
  }
}
