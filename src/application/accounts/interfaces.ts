import mongoose from "mongoose";
import { Request } from "../../server/api/interfaces";

interface GetAccountsMethod {
  (email: string): Promise<Account | null>;
}

interface GetAllAccountsMethod {
  (): Promise<Account[]>;
}

interface CreateAccountMethod {
  (account: Account): Promise<Account>;
}

interface RemoveAccountMethod {
  (id: string): Promise<void>;
}

export interface AccountsRepository {
  get: GetAccountsMethod;
  getAll: GetAllAccountsMethod;
  create: CreateAccountMethod;
  remove: RemoveAccountMethod;
}

export interface AccountsService {
  get: GetAccountsMethod;
  getAll: GetAllAccountsMethod;
  create: CreateAccountMethod;
  remove: RemoveAccountMethod;
}

export interface AccountsController {
  get: (request: Request) => Promise<Account | null>;
  getAll: (request: Request) => Promise<Account[]>;
  create: (request: Request) => Promise<Account>;
  remove: (request: Request) => Promise<void>;
}

export interface Account {
  id: string;
  name: string;
  email: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface AccountSchema extends mongoose.Document {
  name: string;
  email: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
