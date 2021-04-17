import {
  Account,
  AccountSchema,
  AccountsRepository as IAccountRepository,
} from "./interfaces";
import { DuplicateAccountError } from "./errors";
import { AccountDataModel } from "./types";

export class AccountsRepository implements IAccountRepository {
  private accountDataModel: AccountDataModel;

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
    const existingAccount = await this.get(account.email);

    if (existingAccount) {
      throw new DuplicateAccountError(
        "Account with that email already exists",
        { account }
      );
    }

    const rawAccount = await this.accountDataModel.create(account);
    return this.mapToAccount(rawAccount);
  }

  async remove(id: string) {
    await this.accountDataModel.deleteOne({
      _id: id,
    });
  }

  async removeAll() {
    await this.accountDataModel.deleteMany();
  }

  private mapToAccount(rawAccount: AccountSchema): Account {
    return {
      id: rawAccount._id,
      name: rawAccount.name,
      email: rawAccount.email,
      createdAt: rawAccount.createdAt,
      updatedAt: rawAccount.updatedAt,
    };
  }
}
