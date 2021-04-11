import { Request } from "../../server/api/interfaces";
import {
  Account,
  AccountsController as IAccountsController,
  AccountsService,
} from "./interfaces";

export class AccountsController implements IAccountsController {
  accountsService: AccountsService;

  constructor(dependencies: {
    accountsService: AccountsService;
    requestContext: any;
  }) {
    this.accountsService = dependencies.accountsService;
  }

  async get(request: Request): Promise<Account | null> {
    const email: string = request.body.email;

    return await this.accountsService.get(email);
  }

  async getAll(): Promise<Account[]> {
    return await this.accountsService.getAll();
  }
}
