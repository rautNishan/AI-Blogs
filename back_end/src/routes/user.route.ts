import express, { Request, Response, Router } from "express";
import { HttpStatusCode } from "../common/constants/http.status.code";
import { ValidationException } from "../common/exceptions/validation-exceptions";
import { REQUEST_META } from "../common/request/constant/request.constant";
import { UserProtectedGuard } from "../common/request/guards/authenticated.user";
import { RequestListQueryDto } from "../common/request/query/request.list.query.dto";
import { RequestBodyValidation } from "../common/request/validator/request.body.validator";
import { RequestQueryValidator } from "../common/request/validator/request.query.validator";
import { RESPONSE_META } from "../common/response/constants/response.constant";
import { AuthUserController } from "../modules/auth/controllers/auth.user.controller";
import { UserLoginDto } from "../modules/auth/dtos/user.login.dto";
import { UserController } from "../modules/users/controllers/user.controller";
import { UserCreateDto } from "../modules/users/dtos/user.create.dto";
import { asyncHandler } from "../utils/async.handler";
import { BlogUserController } from "../modules/blogs/controllers/blog.user.controller";
import { BlogCreateDto } from "../modules/blogs/dtos/blog.create.dto";
import { RequestIdParamDto } from "../common/request/param/request.id.param.dto";
import { RequestParamValidator } from "../common/request/validator/request.param.validator";

export function userRouterFactory(): Router {
  const userRouter: Router = express.Router();

  //Auth
  const authUserController: AuthUserController = new AuthUserController();

  userRouter.post(
    "/auth/login",
    RequestBodyValidation(UserLoginDto),
    asyncHandler(async (req: Request, res: Response) => {
      const { email, userName } = req.body;
      if (!email && !userName) {
        throw new ValidationException(
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          "At least one email or username is required."
        );
      }
      const data = await authUserController.login(req.body);
      res.json(data);
    })
  );

  const userController: UserController = new UserController();

  userRouter.get(
    "/auth-me",
    UserProtectedGuard,
    asyncHandler(async (req: Request, res: Response) => {
      const protectedUserId = Number(req[REQUEST_META.PROTECTED_USER]);
      const data = await userController.getById(protectedUserId);
      res.json(data);
    })
  );

  userRouter.post(
    "/create",
    // UserProtectedGuard,
    RequestBodyValidation(UserCreateDto),
    asyncHandler(async (req: Request, res: Response) => {
      const incomingData = req.body;
      const createdData = await userController.create(incomingData);
      res.json(createdData);
    })
  );

  //get user
  userRouter.get(
    "/list",
    RequestQueryValidator(RequestListQueryDto),
    asyncHandler(async (req: Request, res: Response) => {
      const data = await userController.getAll(req.query);
      res[RESPONSE_META.RESPONSE_MESSAGE] = "Get List Successfully";
      res.json(data);
    })
  );

  userRouter.get(
    "/info/:id",
    asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      console.log("This is ID: ", id);
      const data = await userController.getById(Number(id));
      res.json(data);
    })
  );

  //Blogs
  const blogController = new BlogUserController();
  userRouter.post(
    "/blog/create",
    UserProtectedGuard,
    RequestBodyValidation(BlogCreateDto),
    asyncHandler(async (req, res) => {
      const incomingData = req.body; //Since it is Valudated Request Body
      console.log("This is Incoming Data: ", incomingData);
      const data = await blogController.create(incomingData);
      res[RESPONSE_META.RESPONSE_MESSAGE] = "Blog Created Successfully";
      res.json(data);
    })
  );

  userRouter.get(
    "/blog/list",
    UserProtectedGuard,
    asyncHandler(async (req: Request, res: Response) => {
      const userId = req[REQUEST_META.PROTECTED_USER];
      res.json(await blogController.getAll({ userId: userId }));
    })
  );

  userRouter.get(
    "/blog/:id",
    RequestParamValidator(RequestIdParamDto),
    UserProtectedGuard,
    asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      const userId = req[REQUEST_META.PROTECTED_USER];
      res.json(
        await blogController.getById(Number(id), {
          protectedUserId: Number(userId),
        })
      );
    })
  );

  return userRouter;
}
