import { Request } from "../../api/types";
import { ITodoController, ITodosService } from "./interfaces";
import { Todo } from "./types";
import { ILogger } from "../../modules/logger/interfaces";

export class TodosController implements ITodoController {
  todosService: ITodosService;
  logger: ILogger;
  requestContext: any;

  constructor(dependencies: {
    todosService: ITodosService;
    logger: ILogger;
    requestContext: any;
  }) {
    this.todosService = dependencies.todosService;
    this.requestContext = dependencies.requestContext;
    this.logger = dependencies.logger;
  }

  async getTodos() {
    this.logger.info("Albert test", { name: "albert" });
    return await this.todosService.getTodos();
  }

  async createTodo(request: Request) {
    const todo: Todo = request.body;

    return this.todosService.createTodo(todo);
  }
}
