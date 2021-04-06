import * as Awilix from "awilix";

import { App } from "./app";
import { port } from "../config/environment";
import { registerDependenciesPlugin } from "./plugins";
import logger from "./modules/logger";

const start = async () => {
  const app = new App({
    port,
    plugins: [registerDependenciesPlugin],
    container: Awilix.createContainer(),
    routers: ["todosRouter"],
    logger,
  });

  await app.start();
};

start();
