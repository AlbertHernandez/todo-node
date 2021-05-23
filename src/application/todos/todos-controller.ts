import { Request } from '@server/api/interfaces';
import { CreateTodoDto } from './dto';
import { Todo } from './entities';
import {
  TodoController as ITodoController,
  TodoFilter,
  TodosService,
} from './interfaces';

export class TodosController implements ITodoController {
  todosService;

  constructor(dependencies: { todosService: TodosService }) {
    this.todosService = dependencies.todosService;
  }

  async get(request: Request): Promise<Todo[]> {
    const todoFilter: TodoFilter = request.body;
    return await this.todosService.get(todoFilter);
  }

  async create(request: Request): Promise<Todo> {
    const createTodoDto = new CreateTodoDto(request.body);

    return await this.todosService.create(createTodoDto);
  }

  async remove(request: Request): Promise<void> {
    const id: string = request.params.id;

    return await this.todosService.remove(id);
  }

  async removeAll(): Promise<void> {
    return await this.todosService.removeAll();
  }
}
