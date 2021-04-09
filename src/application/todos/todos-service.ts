import { IAccountsService } from "../accounts";
import { AccountNotFoundError } from "../errors";
import { ITodosRepository, ITodosService } from "./interfaces";
import { Todo, TodoFilter } from "./types";

export class TodosService implements ITodosService {
  private todosRepository: ITodosRepository;
  private accountsService: IAccountsService;

  constructor(dependencies: {
    todosRepository: ITodosRepository;
    accountsService: IAccountsService;
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
}
