import express, { Request, Response, Router } from "express";
import { HttpStatusCode } from "../common/constants/http.status.code";
import { HttpException } from "../exceptions/http-exceptions";
import { UserController } from "../modules/users/controllers/user.controller";

export function userRouterFactory(): Router {
  const userRouter: Router = express.Router();

  const userController: UserController = new UserController();

  userRouter.post("/create", async (req: Request, res: Response) => {
    const incomingData = req.body;
    const createdData = await userController.create(incomingData);
    res.send(createdData);
  });
  //get user
  userRouter.get("/", (req: Request, res: Response) => {
    // res.send("This is User Get Router");
    console.log("This is Get User");
    res.send({
      message: "This is Message",
    });
  });

  userRouter.get("/err", (req: Request, res: Response) => {
    console.log("This is in error route");
    throw new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, "Test error");
  });

  return userRouter;
}
