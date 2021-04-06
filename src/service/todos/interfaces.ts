import { Todo } from "./types";
import * as Koa from "koa";

export interface ITodoService {
  getTodos: () => Promise<Todo[]>;
  createTodo: (todo: Todo) => Promise<Todo>;
}

export interface ITodoController {
  getTodos: (ctx: Koa.Context) => Promise<void>;
  createTodo: (ctx: Koa.Context) => Promise<void>;
}
