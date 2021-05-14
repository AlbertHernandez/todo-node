import { CreateTodoDto } from '../dto'
import { Todo } from '../entities'

export type CreateTodoMethod = (createTodoDto: CreateTodoDto) => Promise<Todo>
