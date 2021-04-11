import { Account } from "./types";
import { Request } from "../../server/api/types";

export interface AccountsRepository {
  get: (email: string) => Promise<Account | null>;
  getAll: () => Promise<Account[]>;
}

export interface AccountsService {
  get: (email: string) => Promise<Account | null>;
  getAll: () => Promise<Account[]>;
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
