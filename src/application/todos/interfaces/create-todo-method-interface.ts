import { Todo } from '../entities'

export type CreateTodoMethod = (todo: Todo) => Promise<Todo>
