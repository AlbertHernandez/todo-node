import { App } from "./app";
import { port } from "../config/environment";
import { TodosController } from "./todos";
import { TodosService } from "./todos/todos-service";

const app = new App({
  controllers: [new TodosController({ todosService: new TodosService() })],
  port,
});

app.listen();
