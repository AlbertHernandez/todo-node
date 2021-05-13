import {
  AccountsRepository as IAccountRepository
} from './interfaces'
import { DuplicateAccountError } from './errors'
import { MongoError } from '@modules/mongo/constants'
import { Account, accountModel } from './entities'

export class AccountsRepository implements IAccountRepository {
  private readonly accountModel

  constructor (dependencies: { accountModel: accountModel }) {
    this.accountModel = dependencies.accountModel
  }

  async get (email: string): Promise<Account | null> {
    const rawAccount = await this.accountModel.findOne(
      {
        email
      },
      null,
      {
        lean: true
      }
    )

    return (rawAccount != null) ? this.mapToAccount(rawAccount) : null
  }

  async getAll (): Promise<Account[]> {
    const rawAccounts = await this.accountModel.find({}, null, {
      lean: true
    })

    return (rawAccounts.length > 0)
      ? rawAccounts.map((rawAccount) => this.mapToAccount(rawAccount))
      : []
  }

  async create (account: Account): Promise<Account> {
    try {
      const rawAccount = await this.accountModel.create(account)

      return this.mapToAccount(rawAccount)
    } catch (error) {
      if (error.message.includes(MongoError.Duplicate) === true) {
        throw new DuplicateAccountError('Duplicated account', {
          account,
          duplicateKey: error.keyValue
        })
      }
      throw error
    }
  }

  async remove (id: string): Promise<void> {
    await this.accountModel.deleteOne({
      id
    })
  }

  async removeAll (): Promise<void> {
    await this.accountModel.deleteMany({})
  }

  private mapToAccount (rawAccount: any): Account {
    return {
      id: rawAccount.id,
      name: rawAccount.name,
      email: rawAccount.email,
      createdAt: rawAccount.createdAt,
      updatedAt: rawAccount.updatedAt
    }
  }
}
