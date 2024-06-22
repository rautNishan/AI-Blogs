import express, { NextFunction, Request, Response, Router } from "express";
import { HttpStatusCode } from "../common/constants/http.status.code";
import { HttpException } from "../common/exceptions/http-exceptions";
import { UserController } from "../modules/users/controllers/user.controller";
import { RequestBodyValidation } from "../common/request/validator/request.body.validator";
import { UserCreateDto } from "../modules/users/dtos/user.create.dto";
import { UserLoginDto } from "../modules/auth/dtos/user.login.dto";
import { ValidationException } from "../common/exceptions/validation-exceptions";
import { AuthUserController } from "../modules/auth/controllers/auth.user.controller";
import { asyncHandler } from "../utils/async.handler";

export function userRouterFactory(): Router {
  const userRouter: Router = express.Router();

  const userController: UserController = new UserController();

  userRouter.post(
    "/create",
    // UserProtectedGuard,
    RequestBodyValidation(UserCreateDto),
    async (req: Request, res: Response) => {
      const incomingData = req.body;
      const createdData = await userController.create(incomingData);
      res.json(createdData);
    }
  );
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

  //Auth
  const authUserController: AuthUserController = new AuthUserController();

  userRouter.post(
    "/auth/login",
    RequestBodyValidation(UserLoginDto),
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const { email, userName } = req.body;
      if (!email && !userName) {
        throw new ValidationException(
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          "At least one email or username is required."
        );
      }
      const data = await authUserController.login(req.body);
      return data;
    })
  );

  return userRouter;
}
