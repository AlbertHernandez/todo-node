import { Plugin } from '../server/plugins/interfaces/plugin-interface'
import { registerTodosDependencies } from './todos'
import { registerAccountsDependencies } from './accounts'

export const registerApplicationDependencies: Plugin = async (app) => {
  app.logger.trace('Registration of application dependencies...')

  await registerTodosDependencies(app)
  await registerAccountsDependencies(app)

  app.logger.trace('Registration of application dependencies completed!')
}
