import { Request } from "../../server/api/interfaces";
import {
  Account,
  AccountsController as IAccountsController,
  AccountsService,
} from "./interfaces";

export class AccountsController implements IAccountsController {
  private accountsService;

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

  async create(request: Request) {
    const account: Account = request.body;

    return await this.accountsService.create(account);
  }

  async remove(request: Request) {
    const id: string = request.body.id;

    return await this.accountsService.remove(id);
  }

  async removeAll() {
    return await this.accountsService.removeAll();
  }
}
