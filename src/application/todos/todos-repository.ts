import {
  Todo,
  TodoFilter,
  TodoSchema,
  TodosRepository as ITodosRepository,
} from "./interfaces";
import { TodoDataModel } from "./types";

export class TodosRepository implements ITodosRepository {
  private todoDataModel: TodoDataModel;

  constructor(dependencies: { todoDataModel: TodoDataModel }) {
    this.todoDataModel = dependencies.todoDataModel;
  }

  async get(filter: TodoFilter = {}): Promise<Todo[]> {
    const rawMatchedTodos = await this.todoDataModel.find(filter, null, {
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
    await this.todoDataModel.deleteOne({
      _id: id,
    });
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
}
