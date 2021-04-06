import { IApiRouter } from "../../api/interfaces";
import { IApplicationRouter } from "../interfaces";
import { Constructor } from "awilix";
import { ITodoController } from "./interfaces";

export class TodosRouter implements IApplicationRouter {
  router: IApiRouter;
  TodosController: Constructor<ITodoController>;

  prefix = "/api/v1/todos";

  constructor(dependencies: {
    Router: Constructor<IApiRouter>;
    TodosController: Constructor<ITodoController>;
  }) {
    this.router = new dependencies.Router({ prefix: this.prefix });
    this.TodosController = dependencies.TodosController;

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", [this.TodosController, "getTodos"]);
    this.router.post("/", [this.TodosController, "createTodo"]);
  }

  use() {
    return this.router.middleware();
  }
}
