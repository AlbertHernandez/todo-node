import {
  Todo,
  TodoFilter,
  TodoSchema,
  TodosRepository as ITodosRepository,
} from "./interfaces";
import { TodoDataModel } from "./types";
import { generateUuid } from "../common/helpers";

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
    const rawTodo = await this.todoDataModel.create({
      ...todo,
      id: todo.id || generateUuid(),
    });
    return this.mapToTodo(rawTodo);
  }

  async remove(id: string) {
    await this.todoDataModel.deleteOne({
      id,
    });
  }

  async removeAll() {
    await this.todoDataModel.deleteMany();
  }

  private mapToTodo(rawTodo: TodoSchema): Todo {
    return {
      id: rawTodo.id,
      author: rawTodo.author,
      title: rawTodo.title,
      content: rawTodo.content,
      isCompleted: rawTodo.isCompleted,
    };
  }
}
