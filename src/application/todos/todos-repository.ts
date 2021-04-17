import {
  Todo,
  TodoFilter,
  TodoSchema,
  TodosRepository as ITodosRepository,
} from "./interfaces";
import { TodoDataModel } from "./types";
import { TodoNotFoundError } from "./errors";
import { isValidId } from "../common/helpers";

export class TodosRepository implements ITodosRepository {
  private todoDataModel: TodoDataModel;

  constructor(dependencies: { todoDataModel: TodoDataModel }) {
    this.todoDataModel = dependencies.todoDataModel;
  }

  async get(filter: TodoFilter = {}): Promise<Todo[]> {
    if (filter.id && !isValidId(filter.id)) {
      return [];
    }

    const dbFilters = this.mapToDbFilters(filter);
    const rawMatchedTodos = await this.todoDataModel.find(dbFilters, null, {
      lean: true,
    });

    return rawMatchedTodos.length
      ? rawMatchedTodos.map((rawMatchedTodo) => this.mapToTodo(rawMatchedTodo))
      : [];
  }

  async create(todo: Todo) {
    const rawTodo = await this.todoDataModel.create(todo);
    return this.mapToTodo(rawTodo);
  }

  async remove(id: string) {
    const [todo] = await this.get({ id });

    if (!todo) {
      throw new TodoNotFoundError("Not found todo to be removed", { id });
    }

    await this.todoDataModel.deleteOne({
      _id: id,
    });
  }

  async removeAll() {
    await this.todoDataModel.deleteMany();
  }

  private mapToTodo(rawTodo: TodoSchema): Todo {
    return {
      id: rawTodo._id,
      author: rawTodo.author,
      title: rawTodo.title,
      content: rawTodo.content,
      isCompleted: rawTodo.isCompleted,
    };
  }

  private mapToDbFilters(filter: TodoFilter) {
    const dbFilters: any = {};

    if (filter.author !== undefined) {
      dbFilters.author = filter.author;
    }

    if (filter.isCompleted !== undefined) {
      dbFilters.isCompleted = filter.isCompleted;
    }

    if (filter.id !== undefined) {
      dbFilters._id = filter.id;
    }

    return dbFilters;
  }
}
