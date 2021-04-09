import { Todo, TodoFilter } from "./types";
import { Request } from "../../server/api/types";

export interface ITodosService {
  getTodos: (filter?: TodoFilter) => Promise<Todo[]>;
  createTodo: (todo: Todo) => Promise<Todo>;
}

export interface ITodosRepository {
  getTodos: (filter?: TodoFilter) => Promise<Todo[]>;
  createTodo: (todo: Todo) => Promise<Todo>;
}

export interface ITodoController {
  getTodos: (request: Request) => Promise<Todo[]>;
  createTodo: (request: Request) => Promise<Todo>;
}
