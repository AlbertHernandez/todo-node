import { Request } from "../../server/api/types";
import { ITodoController, ITodosService } from "./interfaces";
import { Todo, TodoFilter } from "./types";
import { ILogger } from "../../server/modules/logger/interfaces";

export class TodosController implements ITodoController {
  todosService: ITodosService;

  constructor(dependencies: {
    todosService: ITodosService;
    logger: ILogger;
    requestContext: any;
  }) {
    this.todosService = dependencies.todosService;
  }

  async getTodos(request: Request) {
    const todoFilter: TodoFilter = request.body;
    return await this.todosService.getTodos(todoFilter);
  }

  async createTodo(request: Request) {
    const todo: Todo = request.body;

    return this.todosService.createTodo(todo);
  }
}