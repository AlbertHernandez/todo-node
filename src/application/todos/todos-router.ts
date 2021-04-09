import KoaRouter from "koa-router";

import { todosSchemaValidation } from "./todos-schema-validation";
import {
  requestHandlerMiddleware,
  schemaValidation,
} from "../../server/api/middlewares";

const todosRouter = new KoaRouter({
  prefix: "/api/v1",
});

todosRouter.get(
  "/todos",
  schemaValidation(todosSchemaValidation.getTodos),
  requestHandlerMiddleware(["todosController", "getTodos"])
);

todosRouter.post(
  "/todo",
  schemaValidation(todosSchemaValidation.createTodo),
  requestHandlerMiddleware(["todosController", "createTodo"])
);

export { todosRouter };
