import { Express } from "express";
import { IAppOptions } from "./common/interfaces/app.interfaces";
import { DBConnection } from "./database/connection/connection";
import { ICustomRouter } from "./common/interfaces/router.interface";
export class App {
  private app: Express;

  private port: number;

  constructor(options: IAppOptions) {
    this.app = options.app;
    this.port = options.port;

    this.initializeMiddlewares(options.beforeRouteMiddlewares);

    this.initializeRoutes(options.routes);

    this.initializeMiddlewares(options.afterRouteMiddleWares);
  }

  private initializeMiddlewares(middlewares?: any[]) {
    middlewares?.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private initializeRoutes(routes: ICustomRouter[]) {
    routes.forEach((route) => {
      this.app.use(route.routeName, route.router);
    });
  }

  public async startServer() {
    await DBConnection.connection().then(() => {
      this.app.listen(this.port, () => {
        console.log(`Listing to port ${this.port}`);
      });
    });
  }
}
