import * as Awilix from 'awilix'
import { TodosController, TodosRepository, TodosService } from './'

import { Plugin } from '@plugins/interfaces/plugin-interface'
import { TodoModel } from './entities/todo-entity'

export const registerTodosDependencies: Plugin = async (app) => {
  app.logger.trace('Registration of todos dependencies...')

  app.container.register({
    todosController: Awilix.asClass(TodosController),
    todosService: Awilix.asClass(TodosService),
    todosRepository: Awilix.asClass(TodosRepository),
    todoModel: Awilix.asValue(TodoModel)
  })

  app.logger.trace('Registration of todos dependencies completed!')
}
