import * as Awilix from "awilix";
import { TodosController, TodosRepository, TodosService } from "./";

import { Plugin } from "../../server/plugins/interfaces";
import mongoose from "mongoose";
import { todoSchema } from "./todo-schema";

export const registerTodosDependencies: Plugin = async (app) => {
  app.logger.trace("Registration of todos dependencies...");

  app.container.register({
    todosController: Awilix.asClass(TodosController),
    todosService: Awilix.asClass(TodosService),
    todosRepository: Awilix.asClass(TodosRepository),
    todoDataModel: Awilix.asValue(mongoose.model("Todo", todoSchema)),
  });

  app.logger.trace("Registration of todos dependencies completed!");
};
