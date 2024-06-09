import express, { Express, Request, Response } from "express";
import { GlobalExceptionFilter } from "./common/response/error/global.filter.error";
import { ResponseInterCeptor } from "./common/response/interceptors/response.interceptors";
import { userRouter } from "./routes/user.route";
import { App } from "./app";

const app: Express = express();
const port: number = 3000;

const server = new App({
  app: app,
  port: port,
  beforeRouteMiddlewares: [ResponseInterCeptor],
  routes: [{ routeName: "/user", router: userRouter }],
  afterRouteMiddleWares: [GlobalExceptionFilter],
});

server.startServer();
