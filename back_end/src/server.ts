import express, { Express } from "express";
import { AppInit } from "./app";
import { GlobalExceptionFilter } from "./common/response/error/global.filter.error";
import { ResponseInterCeptor } from "./common/response/interceptors/response.interceptors";
import { DBConnection } from "./database/connection/connection";
import { userRouterFactory } from "./routes/user.route";
import { adminRouterFactory } from "./routes/admin.route";
import cors from "cors";
import path from "path";

export async function main() {
  try {
    const app: Express = express();
    const port: number = 3000;

    console.log("Initializing DataBae....");

    await DBConnection.connection().then(() => {
      app.listen(port, () => {
        console.log(`Listing to port ${port}`);
      });
    });

    new AppInit({
      app: app,
      port: port,
      beforeRouteMiddlewares: [cors(), express.json(), ResponseInterCeptor],
      routes: [
        { routeName: "/user", router: userRouterFactory() },
        { routeName: "/admin", router: adminRouterFactory() },
      ],
      afterRouteMiddleWares: [GlobalExceptionFilter],
    });
  } catch (err) {
    console.log("This is Error in Server: ", err);
    throw err;
  }
}

main();
