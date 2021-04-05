import express from "express";
import bodyParser from "body-parser";

export class App {
  app: express.Application;
  port: number;

  constructor(dependencies: {
    port: number;
    controllers: [{ router: express.Router }];
  }) {
    this.app = express();
    this.port = dependencies.port;

    this.initializeMiddlewares();
    this.initializeControllers(dependencies.controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: [{ router: express.Router }]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
