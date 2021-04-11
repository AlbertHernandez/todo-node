import Router from "koa-router";

import { todosSchemaValidation } from "./todos-schema-validation";
import {
  authorizationMiddleware,
  requestHandlerMiddleware,
  schemaValidation,
} from "../../server/api/middlewares";
import { UserType } from "../../server/api/types";

const todosRouter = new Router({
  prefix: "/api/v1",
});

todosRouter.get(
  "/todos",
  authorizationMiddleware({
    allowedUserTypes: [UserType.API],
  }),
  schemaValidation(todosSchemaValidation.getTodos),
  requestHandlerMiddleware(["todosController", "getTodos"])
);

todosRouter.post(
  "/todo",
  authorizationMiddleware({
    allowedUserTypes: [UserType.API],
  }),
  schemaValidation(todosSchemaValidation.createTodo),
  requestHandlerMiddleware(["todosController", "createTodo"])
);

export { todosRouter };
