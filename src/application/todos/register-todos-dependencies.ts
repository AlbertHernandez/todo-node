import * as Awilix from "awilix";
import { TodosController, TodosRepository, TodosService } from "./";

import { Plugin } from "../../server/plugins/types";
import { ILogger } from "../../server/modules/logger/interfaces";
import { IApp } from "../../server/interfaces";

export const registerTodosDependencies: Plugin = async (app: IApp) => {
  const logger: ILogger = app.container.resolve("logger");
  logger.info("Registration of todos dependencies...");

  app.container.register({
    todosController: Awilix.asClass(TodosController),
    todosService: Awilix.asClass(TodosService),
    todosRepository: Awilix.asClass(TodosRepository),
  });

  logger.info("Registration of todos dependencies completed!");
};
