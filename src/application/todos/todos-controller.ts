import { Request } from "../../server/api/interfaces";
import {
  Todo,
  TodoController as ITodoController,
  TodoFilter,
  TodosService,
} from "./interfaces";

export class TodosController implements ITodoController {
  todosService: TodosService;

  constructor(dependencies: { todosService: TodosService }) {
    this.todosService = dependencies.todosService;
  }

  async getTodos(request: Request) {
    const todoFilter: TodoFilter = request.body;
    return await this.todosService.getTodos(todoFilter);
  }

  async createTodo(request: Request) {
    const todo: Todo = request.body;

    return await this.todosService.createTodo(todo);
  }

  async remove(request: Request) {
    const id: string = request.body.id;

    return await this.todosService.remove(id);
  }
}
