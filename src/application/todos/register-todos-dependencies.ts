import * as Awilix from "awilix";
import { TodosController, TodosService } from "./";

import { Plugin } from "../../server/plugins/types";
import { ILogger } from "../../server/modules/logger/interfaces";

export const registerTodosDependencies: Plugin = async (
  container: Awilix.AwilixContainer
) => {
  const logger: ILogger = container.resolve("logger");
  logger.info("Registration of todos dependencies...");

  container.register({
    todosController: Awilix.asClass(TodosController),
    todosService: Awilix.asClass(TodosService),
  });

  logger.info("Registration of todos dependencies completed!");
};
