import KoaRouter from "koa-router";

import { IApiRouter } from "./interfaces";
import { RouterConfig } from "./types";
import {
  normalizeRequestMiddleware,
  requestHandlerMiddleware,
} from "./middlewares";
import { schemaValidation } from "./middlewares/schema-validation-middleware";

export class Router implements IApiRouter {
  private router: KoaRouter;

  constructor(dependencies: { routerConfig: RouterConfig }) {
    this.router = this.configureRouter(dependencies.routerConfig);
  }

  private configureRouter(routerConfig: RouterConfig) {
    const router = new KoaRouter({
      prefix: routerConfig.prefix || "/",
    });

    for (const route of Object.values(routerConfig.routes)) {
      router[route.method](
        route.path || "/",
        normalizeRequestMiddleware(),
        schemaValidation(route.schema),
        requestHandlerMiddleware(route.handler)
      );
    }

    return router;
  }

  middleware() {
    return this.router.middleware();
  }
}
