import * as Awilix from "awilix";

import { App } from "./app";
import { port } from "../config/environment";
import { registerDependenciesPlugin } from "./plugins";

const start = async () => {
  const app = new App({
    port,
    plugins: [registerDependenciesPlugin],
    container: Awilix.createContainer(),
    routers: ["todosRouter"],
  });

  await app.start();
};

start();
