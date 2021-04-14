import mongoose from "mongoose";
import { Request } from "../../server/api/interfaces";

interface GetTodosMethod {
  (filter?: TodoFilter): Promise<Todo[]>;
}

interface CreateTodoMethod {
  (todo: Todo): Promise<Todo>;
}

interface DeleteTodoMethod {
  (id: string): Promise<void>;
}

export interface TodosService {
  getTodos: GetTodosMethod;
  createTodo: CreateTodoMethod;
  remove: DeleteTodoMethod;
}

export interface TodosRepository {
  getTodos: GetTodosMethod;
  createTodo: CreateTodoMethod;
  remove: DeleteTodoMethod;
}

export interface TodoController {
  getTodos: (request: Request) => Promise<Todo[]>;
  createTodo: (request: Request) => Promise<Todo>;
  remove: (request: Request) => Promise<void>;
}

export interface Todo {
  id: string;
  author: string;
  title: string;
  content: string;
  isCompleted: boolean;
}

export interface TodoFilter {
  author?: string;
  isCompleted?: boolean;
}

export interface TodoSchema extends mongoose.Document {
  author: string;
  title: string;
  content: string;
  isCompleted: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}
