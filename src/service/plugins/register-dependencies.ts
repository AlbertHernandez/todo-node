import * as Awilix from "awilix";
import { TodosController, TodosService } from "../todos";
import { Plugin } from "./types";

export const registerDependenciesPlugin: Plugin = async (
  container: Awilix.AwilixContainer
) => {
  console.log("Registration of application dependencies...");

  container.register({
    todosController: Awilix.asClass(TodosController),
    todosService: Awilix.asClass(TodosService),
  });

  console.log("Registration completed.");
};
