import express, { Express, Request, Response } from "express";
import { IResponse } from "./common/response/interfaces/response.interface";
import { GlobalExceptionFilter } from "./middlewares/error/global.filter.error";
import { userRouter } from "./routes/user.route";
import { HttpException } from "./exceptions/HttpExceptions";
import { ResponseInterCeptor } from "./common/response/interceptors/response.interceptors";
import { DBConnection } from "./database/connection/connection";

const app: Express = express();
const port: number = 3000;

app.use(ResponseInterCeptor);

app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("This is Js is ts");
});

app.use(GlobalExceptionFilter);

DBConnection.connection().then(() => {
  app.listen(port, () => console.log(`Listing to port ${3000}`));
});
