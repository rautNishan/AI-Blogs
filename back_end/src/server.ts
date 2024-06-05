import express from "express";
import { Express, Request, Response } from "express";
import { userRouter } from "./routes/user.route";
import { GlobalExceptionFilter } from "./middlewares/error/global.filter.error";

const app: Express = express();
const port: number = 3000;

app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("This is Js is ts");
});

app.use(GlobalExceptionFilter);

app.listen(port, () => console.log(`Listing to port ${3000}`));
