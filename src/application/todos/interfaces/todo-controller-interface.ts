import { Request } from 'src/server/api/interfaces';
import { Todo } from '../entities';

export interface TodoController {
  get: (request: Request) => Promise<Todo[]>;
  create: (request: Request) => Promise<Todo>;
  remove: (request: Request) => Promise<void>;
  removeAll: (request: Request) => Promise<void>;
}
