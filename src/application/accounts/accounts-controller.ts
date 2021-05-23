import { Request } from '@server/api/interfaces';
import { CreateAccountDto } from './dto';
import { Account } from './entities';
import {
  AccountsController as IAccountsController,
  AccountsService,
} from './interfaces';

export class AccountsController implements IAccountsController {
  private readonly accountsService;

  constructor(dependencies: { accountsService: AccountsService }) {
    this.accountsService = dependencies.accountsService;
  }

  async get(request: Request): Promise<Account | null> {
    const email: string = request.params.email;

    return await this.accountsService.get(email);
  }

  async getAll(): Promise<Account[]> {
    return await this.accountsService.getAll();
  }

  async create(request: Request): Promise<Account> {
    const createAccountDto = new CreateAccountDto(request.body);

    return await this.accountsService.create(createAccountDto);
  }

  async remove(request: Request): Promise<void> {
    const id: string = request.params.id;

    return await this.accountsService.remove(id);
  }

  async removeAll(): Promise<void> {
    return await this.accountsService.removeAll();
  }
}
