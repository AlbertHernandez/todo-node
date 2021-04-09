import { Account } from "./types";
import { IAccountsRepository, IAccountsService } from "./interfaces";

export class AccountsService implements IAccountsService {
  private accountsRepository: IAccountsRepository;

  constructor(dependencies: { accountsRepository: IAccountsRepository }) {
    this.accountsRepository = dependencies.accountsRepository;
  }

  async get(email: string): Promise<Account | null> {
    return await this.accountsRepository.get(email);
  }

  async getAll(): Promise<Account[]> {
    return await this.accountsRepository.getAll();
  }
}
