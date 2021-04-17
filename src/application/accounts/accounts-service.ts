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

  async get(email: string) {
    return await this.accountsRepository.get(email);
  }

  async getAll() {
    return await this.accountsRepository.getAll();
  }

  async create(account: Account) {
    return await this.accountsRepository.create(account);
  }

  async remove(id: string) {
    return await this.accountsRepository.remove(id);
  }

  async removeAll() {
    return await this.accountsRepository.removeAll();
  }
}
