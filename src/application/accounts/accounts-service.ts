import {
  AccountsRepository,
  AccountsService as IAccountsService,
} from "./interfaces";

export class AccountsService implements IAccountsService {
  private accountsRepository: AccountsRepository;

  constructor(dependencies: { accountsRepository: AccountsRepository }) {
    this.accountsRepository = dependencies.accountsRepository;
  }

  async get(email: string) {
    return await this.accountsRepository.get(email);
  }

  async getAll() {
    return await this.accountsRepository.getAll();
  }
}
