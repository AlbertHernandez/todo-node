import Router from "koa-router";

import { todosSchemaValidation } from "./todos-schema-validation";
import * as routerMiddleware from "../../server/api/middlewares/router-middlewares";
import { UserType } from "../../server/api/enums";

const todosRouter = new Router({
  prefix: "/api/v1",
});

todosRouter.get(
  "/todos",
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.API],
  }),
  routerMiddleware.schemaValidationMiddleware(todosSchemaValidation.getTodos),
  routerMiddleware.requestHandlerMiddleware(["todosController", "getTodos"])
);

todosRouter.post(
  "/todo",
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.API],
  }),
  routerMiddleware.schemaValidationMiddleware(todosSchemaValidation.createTodo),
  routerMiddleware.requestHandlerMiddleware(["todosController", "createTodo"])
);

export { todosRouter };
