import { Router } from "../api/router";
import { ITodoController } from "./interfaces";

export class TodosRouter extends Router {
  todosController: ITodoController;

  constructor(dependencies: { todosController: ITodoController }) {
    super({ prefix: "/api/v1/todos" });

    this.todosController = dependencies.todosController;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.get("/", this.todosController.getTodos.bind(this.todosController));

    this.post("/", this.todosController.createTodo.bind(this.todosController));
  }
}
