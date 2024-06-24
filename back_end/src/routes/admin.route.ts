import express, { Request, Response, Router } from "express";
import { asyncHandler } from "../utils/async.handler";
import { UserController } from "../modules/users/controllers/user.controller";
import { RequestBodyValidation } from "../common/request/validator/request.body.validator";
import { UserCreateDto } from "../modules/users/dtos/user.create.dto";
import { UserProtectedGuard } from "../common/request/guards/authenticated.user";

export function adminRouterFactory(): Router {
  const adminRouter: Router = express.Router();

  const userController = new UserController();

  //User Routes
  adminRouter.post(
    "/user/create",
    UserProtectedGuard,
    RequestBodyValidation(UserCreateDto),
    asyncHandler(async (req: Request, res: Response) => {
      return await userController.create(req.body);
    })
  );

  return adminRouter;
}
