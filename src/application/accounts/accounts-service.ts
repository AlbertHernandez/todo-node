import {
  Account,
  AccountsRepository,
  AccountsService as IAccountsService
} from './interfaces'

export class AccountsService implements IAccountsService {
  private readonly accountsRepository

  constructor (dependencies: { accountsRepository: AccountsRepository }) {
    this.accountsRepository = dependencies.accountsRepository
  }

  async get (email: string): Promise<Account | null> {
    return await this.accountsRepository.get(email)
  }

  async getAll (): Promise<Account[]> {
    return await this.accountsRepository.getAll()
  }

  async create (account: Account): Promise<Account> {
    return await this.accountsRepository.create(account)
  }

  async remove (id: string): Promise<void> {
    return await this.accountsRepository.remove(id)
  }

  async removeAll (): Promise<void> {
    return await this.accountsRepository.removeAll()
  }
}
