import Router from "koa-router";

import {
  authorizationMiddleware,
  requestHandlerMiddleware,
  schemaValidation,
} from "../../server/api/middlewares";
import { UserType } from "../../server/api/types";
import { accountsSchemaValidation } from "./accounts-schema-validation";

const accountsRouter = new Router({
  prefix: "/api/v1",
});

accountsRouter.get(
  "/account",
  authorizationMiddleware({
    allowedUserTypes: [UserType.API],
  }),
  schemaValidation(accountsSchemaValidation.get),
  requestHandlerMiddleware(["accountsController", "get"])
);

accountsRouter.get(
  "/accounts",
  authorizationMiddleware({
    allowedUserTypes: [UserType.API],
  }),
  schemaValidation(accountsSchemaValidation.getAll),
  requestHandlerMiddleware(["accountsController", "getAll"])
);

export { accountsRouter };
