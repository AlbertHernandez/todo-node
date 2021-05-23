import { Request } from '@server/api/interfaces';
import { Account } from '../entities';

export interface AccountsController {
  get: (request: Request) => Promise<Account | null>;
  getAll: (request: Request) => Promise<Account[]>;
  create: (request: Request) => Promise<Account>;
  remove: (request: Request) => Promise<void>;
  removeAll: (request: Request) => Promise<void>;
}
