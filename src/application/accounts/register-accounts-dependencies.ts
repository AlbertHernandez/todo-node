import * as Awilix from "awilix";

import { Plugin } from "../../server/plugins/types";
import { ILogger } from "../../server/modules/logger/interfaces";
import { AccountsController, AccountsRepository, AccountsService } from ".";
import { IApp } from "../../server/interfaces";

export const registerAccountsDependencies: Plugin = async (app: IApp) => {
  const logger: ILogger = app.container.resolve("logger");
  logger.info("Registration of accounts dependencies...");

  app.container.register({
    accountsController: Awilix.asClass(AccountsController),
    accountsService: Awilix.asClass(AccountsService),
    accountsRepository: Awilix.asClass(AccountsRepository),
  });

  logger.info("Registration of accounts dependencies completed!");
};
