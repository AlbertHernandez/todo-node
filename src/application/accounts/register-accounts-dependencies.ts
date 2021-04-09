import * as Awilix from "awilix";

import { Plugin } from "../../server/plugins/types";
import { ILogger } from "../../server/modules/logger/interfaces";
import { AccountsController, AccountsRepository, AccountsService } from ".";

export const registerAccountsDependencies: Plugin = async (
  container: Awilix.AwilixContainer
) => {
  const logger: ILogger = container.resolve("logger");
  logger.info("Registration of accounts dependencies...");

  container.register({
    accountsController: Awilix.asClass(AccountsController),
    accountsService: Awilix.asClass(AccountsService),
    accountsRepository: Awilix.asClass(AccountsRepository),
  });

  logger.info("Registration of accounts dependencies completed!");
};
