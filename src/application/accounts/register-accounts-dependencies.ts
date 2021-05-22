import * as Awilix from 'awilix'

import { AppDependencies } from '@plugins/interfaces/plugin-interface'
import { AccountsController, AccountsRepository, AccountsService } from '.'
import { AccountModel } from './entities'

export const registerAccountsDependencies: AppDependencies = async (app) => {
  app.logger.trace('Registration of accounts dependencies...')

  app.container.register({
    accountsController: Awilix.asClass(AccountsController),
    accountsService: Awilix.asClass(AccountsService),
    accountsRepository: Awilix.asClass(AccountsRepository),
    accountModel: Awilix.asValue(AccountModel)
  })

  app.logger.trace('Registration of accounts dependencies completed!')
}
