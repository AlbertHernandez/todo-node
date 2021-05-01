import { TodoFilter } from './todo-filter-interface'
import { Todo } from './todo-interface'

export type GetTodosMethod = (filter?: TodoFilter) => Promise<Todo[]>
