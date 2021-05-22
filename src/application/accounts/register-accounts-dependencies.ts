import * as Awilix from 'awilix'

import { AppDependencies } from '@plugins/interfaces/plugin-interface'
import { AccountsController, AccountsRepository, AccountsService } from '.'
import { AccountModel } from './entities'

export const registerAccountsDependencies: AppDependencies = async ({
  logger,
  container
}) => {
  logger.trace('Registration of accounts dependencies...')

  container.register({
    accountsController: Awilix.asClass(AccountsController),
    accountsService: Awilix.asClass(AccountsService),
    accountsRepository: Awilix.asClass(AccountsRepository),
    accountModel: Awilix.asValue(AccountModel)
  })

  logger.trace('Registration of accounts dependencies completed!')
}
