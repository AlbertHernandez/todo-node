import {
  Todo,
  TodoFilter,
  TodosRepository as ITodosRepository,
} from "./interfaces";

export class TodosRepository implements ITodosRepository {
  private todos: Todo[];

  constructor() {
    this.todos = [
      {
        id: "1",
        author: "Marcin",
        title: "Lorem Ipsum",
        content: "Dolor sit amet",
        isCompleted: false,
      },
    ];
  }

  async getTodos(filter: TodoFilter = {}) {
    const rawMatchedTodos = this.todos.filter((todo) =>
      this.match(todo, filter)
    );

    return rawMatchedTodos.map((rawMatchedTodo) =>
      this.mapToTodo(rawMatchedTodo)
    );
  }

  async createTodo(todo: Todo) {
    this.todos.push(todo);
    return todo;
  }

  private match(todo: Todo, filter: TodoFilter) {
    let match = true;

    if (filter.isCompleted !== undefined) {
      match = match && todo.isCompleted === filter.isCompleted;
    }

    if (filter.author !== undefined) {
      match = match && todo.author === filter.author;
    }

    return match;
  }

  private mapToTodo(rawTodo: Todo): Todo {
    return {
      id: rawTodo.id,
      author: rawTodo.author,
      title: rawTodo.title,
      content: rawTodo.content,
      isCompleted: rawTodo.isCompleted,
    };
  }
}
