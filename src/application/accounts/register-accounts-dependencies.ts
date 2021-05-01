import * as Awilix from 'awilix'
import mongoose from 'mongoose'

import { Plugin } from '../../server/plugins/interfaces/plugin-interface'
import { AccountsController, AccountsRepository, AccountsService } from '.'
import { accountSchema } from './account-schema'

export const registerAccountsDependencies: Plugin = async (app) => {
  app.logger.trace('Registration of accounts dependencies...')

  app.container.register({
    accountsController: Awilix.asClass(AccountsController),
    accountsService: Awilix.asClass(AccountsService),
    accountsRepository: Awilix.asClass(AccountsRepository),
    accountDataModel: Awilix.asValue(mongoose.model('Account', accountSchema))
  })

  app.logger.trace('Registration of accounts dependencies completed!')
}
