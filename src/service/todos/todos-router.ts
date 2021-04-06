import Router from "koa-router";
import { IRouter } from "../interfaces";
import { ITodoController } from "./interfaces";

export class TodosRouter implements IRouter {
  router = new Router({
    prefix: "/api/v1/todos",
  });
  todosController: ITodoController;

  constructor(dependencies: { todosController: ITodoController }) {
    this.todosController = dependencies.todosController;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/",
      this.todosController.getTodos.bind(this.todosController)
    );

    this.router.post(
      "/",
      this.todosController.createTodo.bind(this.todosController)
    );
  }
}
