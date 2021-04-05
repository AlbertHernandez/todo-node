import express from "express";
import bodyParser from "body-parser";
import awilix from "awilix";

import { Plugin } from "./plugins/types";
import { IController } from "./interfaces";

export class App {
  app: express.Application;
  port: number;
  container: awilix.AwilixContainer;
  plugins: Plugin[];
  controllers: string[];

  constructor(dependencies: {
    port: number;
    controllers: string[];
    container: awilix.AwilixContainer;
    plugins: Plugin[];
  }) {
    this.app = express();
    this.port = dependencies.port;
    this.container = dependencies.container;
    this.plugins = dependencies.plugins;
    this.controllers = dependencies.controllers;
  }

  private async initializePlugins() {
    for (const plugin of this.plugins) {
      await plugin(this.container);
    }
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers() {
    this.controllers.forEach((controllerName) => {
      if (this.container.has(controllerName)) {
        const controller: IController = this.container.resolve(controllerName);
        this.app.use("/", controller.router);
      }
    });
  }

  async start() {
    await this.app.listen(this.port);
    await this.initializePlugins();

    this.initializeMiddlewares();
    this.initializeControllers();
    console.log(`App Ready in Port ${this.port}`);
  }
}
