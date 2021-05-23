import * as Awilix from 'awilix';
import { TodosController, TodosRepository, TodosService } from './';

import { AppDependencies } from '@plugins/interfaces/plugin-interface';
import { TodoModel } from './entities/todo-entity';

export const registerTodosDependencies: AppDependencies = async ({
  logger,
  container,
}) => {
  logger.trace('Registration of todos dependencies...');

  container.register({
    todosController: Awilix.asClass(TodosController),
    todosService: Awilix.asClass(TodosService),
    todosRepository: Awilix.asClass(TodosRepository),
    todoModel: Awilix.asValue(TodoModel),
  });

  logger.trace('Registration of todos dependencies completed!');
};
