import {
  Account,
  AccountSchema,
  AccountsRepository as IAccountRepository
} from './interfaces'
import { DuplicateAccountError } from './errors'
import { AccountDataModel } from './types'
import { generateUuid } from '../common/helpers'
import { MongoError } from '@modules/mongo/constants'

export class AccountsRepository implements IAccountRepository {
  private readonly accountDataModel

  constructor (dependencies: { accountDataModel: AccountDataModel }) {
    this.accountDataModel = dependencies.accountDataModel
  }

  async get (email: string): Promise<Account | null> {
    const rawAccount = await this.accountDataModel.findOne(
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
    const rawAccounts = await this.accountDataModel.find({}, null, {
      lean: true
    })

    return (rawAccounts.length > 0)
      ? rawAccounts.map((rawAccount) => this.mapToAccount(rawAccount))
      : []
  }

  async create (account: Account): Promise<Account> {
    try {
      const rawAccount = await this.accountDataModel.create({
        ...account,
        id: account.id ?? generateUuid()
      })

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
    await this.accountDataModel.deleteOne({
      id
    })
  }

  async removeAll (): Promise<void> {
    await this.accountDataModel.deleteMany()
  }

  private mapToAccount (rawAccount: AccountSchema): Account {
    return {
      id: rawAccount.id,
      name: rawAccount.name,
      email: rawAccount.email,
      createdAt: rawAccount.createdAt,
      updatedAt: rawAccount.updatedAt
    }
  }
}
