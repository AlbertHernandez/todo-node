import { Todo } from './todo-interface'

export type CreateTodoMethod = (todo: Todo) => Promise<Todo>
