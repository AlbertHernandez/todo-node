import Router from "koa-router";

import * as routerMiddleware from "../../server/api/middlewares/router-middlewares";
import { UserType } from "../../server/api/types";
import { accountsSchemaValidation } from "./accounts-schema-validation";

const accountsRouter = new Router({
  prefix: "/api/v1",
});

accountsRouter.get(
  "/account",
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.API],
  }),
  routerMiddleware.schemaValidationMiddleware(accountsSchemaValidation.get),
  routerMiddleware.requestHandlerMiddleware(["accountsController", "get"])
);

accountsRouter.get(
  "/accounts",
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.API],
  }),
  routerMiddleware.schemaValidationMiddleware(accountsSchemaValidation.getAll),
  routerMiddleware.requestHandlerMiddleware(["accountsController", "getAll"])
);

export { accountsRouter };
