import { Todo } from '../entities'
import { TodoFilter } from './todo-filter-interface'

export type GetTodosMethod = (filter?: TodoFilter) => Promise<Todo[]>
