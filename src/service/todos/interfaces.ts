import { Todo } from "./types";

export interface ITodoService {
  getTodos: () => Promise<Todo[]>;
  createTodo: (todo: Todo) => Promise<Todo>;
}
