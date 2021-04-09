import KoaRouter from "koa-router";

import {
  requestHandlerMiddleware,
  schemaValidation,
} from "../../server/api/middlewares";
import { accountsSchemaValidation } from "./accounts-schema-validation";

const accountsRouter = new KoaRouter({
  prefix: "/api/v1",
});

accountsRouter.get(
  "/account",
  schemaValidation(accountsSchemaValidation.get),
  requestHandlerMiddleware(["accountsController", "get"])
);

accountsRouter.get(
  "/accounts",
  schemaValidation(accountsSchemaValidation.getAll),
  requestHandlerMiddleware(["accountsController", "getAll"])
);

export { accountsRouter };
