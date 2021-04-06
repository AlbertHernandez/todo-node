import * as Awilix from "awilix";
import {
  TodosController,
  TodosRouter,
  TodosService,
} from "../application/todos";
import { Plugin } from "./types";
import { ILogger } from "../modules/logger/interfaces";
import { Router } from "../api/router";

export const registerDependenciesPlugin: Plugin = async (
  container: Awilix.AwilixContainer
) => {
  const logger: ILogger = container.resolve("logger");
  logger.info("Registration of application dependencies...");

  container.register({
    Router: Awilix.asValue(Router),

    todosRouter: Awilix.asClass(TodosRouter).inject((parentContainer) => ({
      TodosController: parentContainer.build(Awilix.asValue(TodosController)),
    })),
    todosController: Awilix.asClass(TodosController),
    todosService: Awilix.asClass(TodosService),
  });

  logger.info("Registration of application dependencies completed!");
};
