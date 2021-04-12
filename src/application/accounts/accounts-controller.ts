import { Request } from "../../server/api/interfaces";
import {
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

  async get(request: Request) {
    const email: string = request.body.email;

    return await this.accountsService.get(email);
  }

  async getAll() {
    return await this.accountsService.getAll();
  }
}
