import { AccountsService } from "../accounts/interfaces";
import { AccountNotFoundError } from "../errors";
import {
  Todo,
  TodoFilter,
  TodosRepository,
  TodosService as ITodosService,
} from "./interfaces";

export class TodosService implements ITodosService {
  private todosRepository: TodosRepository;
  private accountsService: AccountsService;

  constructor(dependencies: {
    todosRepository: TodosRepository;
    accountsService: AccountsService;
  }) {
    this.todosRepository = dependencies.todosRepository;
    this.accountsService = dependencies.accountsService;
  }

  async getTodos(filter?: TodoFilter) {
    return await this.todosRepository.getTodos(filter);
  }

  async createTodo(todo: Todo) {
    const account = await this.accountsService.get(todo.author);

    if (!account) {
      throw new AccountNotFoundError("Account not found", {
        email: todo.author,
      });
    }

    return await this.todosRepository.createTodo(todo);
  }

  async remove(id: string) {
    return await this.todosRepository.remove(id);
  }
}
