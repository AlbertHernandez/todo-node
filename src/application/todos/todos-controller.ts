import { Request } from "../../server/api/interfaces";
import {
  Todo,
  TodoController as ITodoController,
  TodoFilter,
  TodosService,
} from "./interfaces";

export class TodosController implements ITodoController {
  todosService;

  constructor(dependencies: { todosService: TodosService }) {
    this.todosService = dependencies.todosService;
  }

  async get(request: Request) {
    const todoFilter: TodoFilter = request.body;
    return await this.todosService.get(todoFilter);
  }

  async create(request: Request) {
    const todo: Todo = request.body;

    return await this.todosService.create(todo);
  }

  async remove(request: Request) {
    const id: string = request.body.id;

    return await this.todosService.remove(id);
  }

  async removeAll() {
    return await this.todosService.removeAll();
  }
}
