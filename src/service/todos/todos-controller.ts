import * as Koa from "koa";

import { ITodoController, ITodoService } from "./interfaces";
import { Todo } from "./types";

export class TodosController implements ITodoController {
  todosService: ITodoService;

  constructor(dependencies: { todosService: ITodoService }) {
    this.todosService = dependencies.todosService;
  }

  async getTodos(ctx: Koa.Context) {
    const todos = await this.todosService.getTodos();
    ctx.body = todos;
  }

  async createTodo(ctx: Koa.Context) {
    const todo: Todo = ctx.request.body;

    const createdTodo = await this.todosService.createTodo(todo);

    ctx.body = createdTodo;
  }
}
