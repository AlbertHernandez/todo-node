import * as Awilix from "awilix";
import { TodosController, TodosService } from "../application/todos";
import { Plugin } from "./types";
import { ILogger } from "../modules/logger/interfaces";

export const registerDependenciesPlugin: Plugin = async (
  container: Awilix.AwilixContainer
) => {
  const logger: ILogger = container.resolve("logger");
  logger.info("Registration of application dependencies...");

  container.register({
    todosController: Awilix.asClass(TodosController),
    todosService: Awilix.asClass(TodosService),
  });

  logger.info("Registration of application dependencies completed!");
};
