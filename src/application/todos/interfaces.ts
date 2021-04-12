import { Request } from "../../server/api/interfaces";

interface GetTodosMethod {
  (filter?: TodoFilter): Promise<Todo[]>;
}

interface CreateTodoMethod {
  (todo: Todo): Promise<Todo>;
}

export interface TodosService {
  getTodos: GetTodosMethod;
  createTodo: CreateTodoMethod;
}

export interface TodosRepository {
  getTodos: GetTodosMethod;
  createTodo: CreateTodoMethod;
}

export interface TodoController {
  getTodos: (request: Request) => Promise<Todo[]>;
  createTodo: (request: Request) => Promise<Todo>;
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
