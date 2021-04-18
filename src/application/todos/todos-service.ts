import { AccountsService } from "../accounts/interfaces";
import { AccountNotFoundError } from "../errors";
import {
  Todo,
  TodoFilter,
  TodosRepository,
  TodosService as ITodosService,
} from "./interfaces";

export class TodosService implements ITodosService {
  private todosRepository;
  private accountsService;

  constructor(dependencies: {
    todosRepository: TodosRepository;
    accountsService: AccountsService;
  }) {
    this.todosRepository = dependencies.todosRepository;
    this.accountsService = dependencies.accountsService;
  }

  async get(filter?: TodoFilter) {
    return await this.todosRepository.get(filter);
  }

  async create(todo: Todo) {
    const account = await this.accountsService.get(todo.author);

    if (!account) {
      throw new AccountNotFoundError("Account not found", {
        email: todo.author,
      });
    }

    return await this.todosRepository.create(todo);
  }

  async remove(id: string) {
    return await this.todosRepository.remove(id);
  }

  async removeAll() {
    return await this.todosRepository.removeAll();
  }
}
