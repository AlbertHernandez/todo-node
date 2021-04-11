import { Account } from ".";
import { Request } from "../../server/api/types";
import { IAccountsController, IAccountsService } from "./interfaces";

export class AccountsController implements IAccountsController {
  accountsService: IAccountsService;

  constructor(dependencies: {
    accountsService: IAccountsService;
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
