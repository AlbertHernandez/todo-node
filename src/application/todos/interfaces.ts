import { Request } from "../../server/api/interfaces";

export interface TodosService {
  getTodos: (filter?: TodoFilter) => Promise<Todo[]>;
  createTodo: (todo: Todo) => Promise<Todo>;
}

export interface TodosRepository {
  getTodos: (filter?: TodoFilter) => Promise<Todo[]>;
  createTodo: (todo: Todo) => Promise<Todo>;
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
