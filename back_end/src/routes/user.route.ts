import express, { Router, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpExceptions";

export const userRouter: Router = express.Router();

//get user
userRouter.get("/", (req: Request, res: Response) => {
  res.send("This is User Get Router");
});

userRouter.get("/err", (req: Request, res: Response) => {
  throw new HttpException(400, "Test error");
});
