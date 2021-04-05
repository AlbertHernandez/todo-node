import express from "express";
import { IController } from "../interfaces";
import { ITodoService } from "./interfaces";
import { Todo } from "./types";

export class TodosController implements IController {
  path = "/todos";
  router = express.Router();

  todosService: ITodoService;

  constructor(dependencies: { todosService: ITodoService }) {
    this.initializeRoutes();

    this.todosService = dependencies.todosService;
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllTodos);
    this.router.post(this.path, this.createTodo);
  }

  private getAllTodos = async (
    request: express.Request,
    response: express.Response
  ) => {
    const todos = await this.todosService.getTodos();
    response.send(todos);
  };

  private createTodo = async (
    request: express.Request,
    response: express.Response
  ) => {
    const todo: Todo = request.body;

    const createdTodo = await this.todosService.createTodo(todo);

    response.send(createdTodo);
  };
}
