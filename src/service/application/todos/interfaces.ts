import { Todo } from "./types";
import { Request } from "../../api/types";

export interface ITodosService {
  getTodos: () => Promise<Todo[]>;
  createTodo: (todo: Todo) => Promise<Todo>;
}

export interface ITodoController {
  getTodos: (request: Request) => Promise<Todo[]>;
  createTodo: (request: Request) => Promise<Todo>;
}
