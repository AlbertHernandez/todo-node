import mongoose from 'mongoose'
import { Request } from '../../server/api/interfaces'

type GetTodosMethod = (filter?: TodoFilter) => Promise<Todo[]>

type CreateTodoMethod = (todo: Todo) => Promise<Todo>

type DeleteTodoMethod = (id: string) => Promise<void>

type DeleteAllTodosMethod = () => Promise<void>

export interface TodosService {
  get: GetTodosMethod
  create: CreateTodoMethod
  remove: DeleteTodoMethod
  removeAll: DeleteAllTodosMethod
}

export interface TodosRepository {
  get: GetTodosMethod
  create: CreateTodoMethod
  remove: DeleteTodoMethod
  removeAll: DeleteAllTodosMethod
}

export interface TodoController {
  get: (request: Request) => Promise<Todo[]>
  create: (request: Request) => Promise<Todo>
  remove: (request: Request) => Promise<void>
  removeAll: (request: Request) => Promise<void>
}

export interface Todo {
  id: string
  author: string
  title: string
  content: string
  isCompleted: boolean
}

export interface TodoFilter {
  author?: string
  isCompleted?: boolean
  id?: string
}

export interface TodoSchema extends mongoose.Document {
  id: string
  author: string
  title: string
  content: string
  isCompleted: boolean
  createdAt: Date | null
  updatedAt: Date | null
}
