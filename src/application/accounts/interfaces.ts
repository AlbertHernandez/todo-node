import { Account } from "./types";
import { Request } from "../../server/api/types";

export interface IAccountsRepository {
  get: (email: string) => Promise<Account | null>;
  getAll: () => Promise<Account[]>;
}

export interface IAccountsService {
  get: (email: string) => Promise<Account | null>;
  getAll: () => Promise<Account[]>;
}

export interface IAccountsController {
  get: (request: Request) => Promise<Account | null>;
  getAll: (request: Request) => Promise<Account[]>;
}
