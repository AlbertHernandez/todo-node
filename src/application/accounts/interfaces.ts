import { Request } from "../../server/api/interfaces";

interface GetAccountsMethod {
  (email: string): Promise<Account | null>;
}

interface GetAllAccountsMethod {
  (): Promise<Account[]>;
}

export interface AccountsRepository {
  get: GetAccountsMethod;
  getAll: GetAllAccountsMethod;
}

export interface AccountsService {
  get: GetAccountsMethod;
  getAll: GetAllAccountsMethod;
}

export interface AccountsController {
  get: (request: Request) => Promise<Account | null>;
  getAll: (request: Request) => Promise<Account[]>;
}

export interface Account {
  name: string;
  email: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
