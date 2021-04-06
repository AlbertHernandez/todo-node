import { Request } from "../api/types";
import { ITodoController, ITodoService } from "./interfaces";
import { Todo } from "./types";

export class TodosController implements ITodoController {
  todosService: ITodoService;

  constructor(dependencies: { todosService: ITodoService }) {
    this.todosService = dependencies.todosService;
  }

  async getTodos() {
    return this.todosService.getTodos();
  }

  async createTodo(request: Request) {
    const todo: Todo = request.body;

    return this.todosService.createTodo(todo);
  }
}
