import {
  Account,
  AccountSchema,
  AccountsRepository as IAccountRepository,
} from "./interfaces";
import { DuplicateAccountError } from "./errors";
import { AccountDataModel } from "./types";
import { generateUuid } from "../common/helpers";
import { MongoError } from "../../server/modules/mongo/enums";

export class AccountsRepository implements IAccountRepository {
  private accountDataModel;

  constructor(dependencies: { accountDataModel: AccountDataModel }) {
    this.accountDataModel = dependencies.accountDataModel;
  }

  async get(email: string) {
    const rawAccount = await this.accountDataModel.findOne(
      {
        email,
      },
      null,
      {
        lean: true,
      }
    );

    return rawAccount ? this.mapToAccount(rawAccount) : null;
  }

  async getAll() {
    const rawAccounts = await this.accountDataModel.find({}, null, {
      lean: true,
    });

    return rawAccounts.length
      ? rawAccounts.map((rawAccount) => this.mapToAccount(rawAccount))
      : [];
  }

  async create(account: Account) {
    try {
      const rawAccount = await this.accountDataModel.create({
        ...account,
        id: account.id || generateUuid(),
      });

      return this.mapToAccount(rawAccount);
    } catch (error) {
      if (error.message.includes(MongoError.Duplicate)) {
        throw new DuplicateAccountError("Duplicated account", {
          account,
          duplicateKey: error.keyValue,
        });
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.accountDataModel.deleteOne({
      id,
    });
  }

  async removeAll() {
    await this.accountDataModel.deleteMany();
  }

  private mapToAccount(rawAccount: AccountSchema): Account {
    return {
      id: rawAccount.id,
      name: rawAccount.name,
      email: rawAccount.email,
      createdAt: rawAccount.createdAt,
      updatedAt: rawAccount.updatedAt,
    };
  }
}
