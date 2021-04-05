import { ITodoService } from "./interfaces";
import { Todo } from "./types";

export class TodosService implements ITodoService {
  private todos: Todo[] = [
    {
      id: "1",
      author: "Marcin",
      title: "Lorem Ipsum",
      content: "Dolor sit amet",
      isCompleted: false,
    },
  ];

  async getTodos() {
    return this.todos;
  }

  async createTodo(todo: Todo) {
    this.todos.push(todo);
    return todo;
  }
}
