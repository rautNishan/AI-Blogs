import express, { NextFunction, Request, Response, Router } from "express";
import { HttpException } from "../exceptions/HttpExceptions";

export const userRouter: Router = express.Router();

//get user
userRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  // res.send("This is User Get Router");
  console.log("This is Get User");
  res.send({
    message: "This is Message",
  });
});

userRouter.get("/err", (req: Request, res: Response) => {
  console.log("This is in error route");
  throw new HttpException(400, "Test error");
});
