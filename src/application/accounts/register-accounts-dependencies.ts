import * as Awilix from "awilix";

import { Plugin } from "../../server/plugins/interfaces";
import { AccountsController, AccountsRepository, AccountsService } from ".";

export const registerAccountsDependencies: Plugin = async (app) => {
  app.logger.debug("Registration of accounts dependencies...");

  app.container.register({
    accountsController: Awilix.asClass(AccountsController),
    accountsService: Awilix.asClass(AccountsService),
    accountsRepository: Awilix.asClass(AccountsRepository),
  });

  app.logger.debug("Registration of accounts dependencies completed!");
};
