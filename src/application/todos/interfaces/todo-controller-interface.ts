import { Request } from '@server/api/interfaces'
import { Todo } from './todo-interface'

export interface TodoController {
  get: (request: Request) => Promise<Todo[]>
  create: (request: Request) => Promise<Todo>
  remove: (request: Request) => Promise<void>
  removeAll: (request: Request) => Promise<void>
}
