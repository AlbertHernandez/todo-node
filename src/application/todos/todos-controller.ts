import { Request } from "../../server/api/types";
import { ITodoController, ITodosService } from "./interfaces";
import { Todo } from "./types";
import { ILogger } from "../../server/modules/logger/interfaces";

export class TodosController implements ITodoController {
  todosService: ITodosService;
  requestContext: any;

  constructor(dependencies: {
    todosService: ITodosService;
    logger: ILogger;
    requestContext: any;
  }) {
    this.todosService = dependencies.todosService;
    this.requestContext = dependencies.requestContext;
  }

  async getTodos() {
    return await this.todosService.getTodos();
  }

  async createTodo(request: Request) {
    const todo: Todo = request.body;

    return this.todosService.createTodo(todo);
  }
}
