import { Request } from "../api/types";
import { ITodoController, ITodoService } from "./interfaces";
import { Todo } from "./types";

export class TodosController implements ITodoController {
  todosService: ITodoService;

  constructor(dependencies: { todosService: ITodoService }) {
    this.todosService = dependencies.todosService;
  }

  async getTodos() {
    const todos = await this.todosService.getTodos();
    return todos;
  }

  async createTodo(request: Request) {
    const todo: Todo = request.body;

    const createdTodo = await this.todosService.createTodo(todo);
    return createdTodo;
  }
}
