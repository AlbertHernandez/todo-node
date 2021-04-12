import {
  Account,
  AccountsRepository as IAccountRepository,
} from "./interfaces";

export class AccountsRepository implements IAccountRepository {
  private accounts: Account[];

  constructor() {
    this.accounts = [
      {
        name: "Admin",
        email: "admin@todos.com",
        createdAt: null,
        updatedAt: null,
      },
    ];
  }

  async get(email: string) {
    const rawAccount = this.accounts.find(
      (rawAccount) => rawAccount.email === email
    );

    return rawAccount ? this.mapToAccount(rawAccount) : null;
  }

  async getAll() {
    return this.accounts.map((rawAccount) => this.mapToAccount(rawAccount));
  }

  private mapToAccount(rawAccount: Account): Account {
    return {
      name: rawAccount.name,
      email: rawAccount.email,
      createdAt: rawAccount.createdAt,
      updatedAt: rawAccount.updatedAt,
    };
  }
}
