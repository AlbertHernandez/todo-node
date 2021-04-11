import * as Awilix from "awilix";
import { TodosController, TodosRepository, TodosService } from "./";

import { Plugin } from "../../server/plugins/interfaces";

export const registerTodosDependencies: Plugin = async (app) => {
  app.logger.debug("Registration of todos dependencies...");

  app.container.register({
    todosController: Awilix.asClass(TodosController),
    todosService: Awilix.asClass(TodosService),
    todosRepository: Awilix.asClass(TodosRepository),
  });

  app.logger.debug("Registration of todos dependencies completed!");
};
