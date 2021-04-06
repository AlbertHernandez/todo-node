import * as Awilix from "awilix";
import { TodosController, TodosRouter, TodosService } from "../todos";
import { Plugin } from "./types";

export const registerDependenciesPlugin: Plugin = async (
  container: Awilix.AwilixContainer
) => {
  console.log("Registration of application dependencies...");

  container.register({
    todosRouter: Awilix.asClass(TodosRouter),
    todosController: Awilix.asClass(TodosController),
    todosService: Awilix.asClass(TodosService),
  });

  console.log("Registration completed.");
};
