import express, { Request, Response, Router } from "express";
import multer, { Multer } from "multer";
import { HttpStatusCode } from "../common/constants/http.status.code";
import { ValidationException } from "../common/exceptions/validation-exceptions";
import { storage } from "../common/file/multer/multer.setup";
import { REQUEST_META } from "../common/request/constant/request.constant";
import { UserProtectedGuard } from "../common/request/guards/authenticated.user";
import {
  RequestFileNameParamDto,
  RequestIdParamDto,
} from "../common/request/param/request.id.param.dto";
import { RequestListQueryDto } from "../common/request/query/request.list.query.dto";
import { RequestBodyValidation } from "../common/request/validator/request.body.validator";
import { RequestParamValidator } from "../common/request/validator/request.param.validator";
import { RequestQueryValidator } from "../common/request/validator/request.query.validator";
import { RESPONSE_META } from "../common/response/constants/response.constant";
import { AuthUserController } from "../modules/auth/controllers/auth.user.controller";
import { UserLoginDto } from "../modules/auth/dtos/user.login.dto";
import { BlogUserController } from "../modules/blogs/controllers/blog.user.controller";
import { BlogCreateDto } from "../modules/blogs/dtos/blog.create.dto";
import { FileUserController } from "../modules/files/controllers/file.user.controller";
import { UserController } from "../modules/users/controllers/user.controller";
import { UserCreateDto } from "../modules/users/dtos/user.create.dto";
import { asyncHandler } from "../utils/async.handler";
import { HttpException } from "../common/exceptions/http-exceptions";
import { IBlog } from "../modules/blogs/interfaces/blog.interface";

export function userRouterFactory(): Router {
  const userRouter: Router = express.Router();
  const upload = multer({ storage });

  //Auth
  const authUserController: AuthUserController = new AuthUserController();

  //Auth
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

  //User
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
      const incomingData: IBlog = req.body; //Since it is Valuated Request Body
      const userId: number = req[REQUEST_META.PROTECTED_USER];
      incomingData.userId = userId;
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

  //Files
  const fileUserController = FileUserController.getInstance();

  //Upload Images
  userRouter.post(
    "/file/upload/image",
    upload.single("image"),
    asyncHandler(async (req: Request, res: Response) => {
      const file = req.file;
      if (!file) {
        throw new HttpException(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          "No File Found"
        );
      }
      const response = await fileUserController.uploadImage({
        mimeType: file.mimetype,
        buffer: file?.buffer,
        originalName: file?.originalname,
        size: file.size,
      });
      res[RESPONSE_META.RESPONSE_MESSAGE] = "Image Upload Successfully";
      console.log("This is Response: ", response);
      res.json(response);
    })
  );

  //Delete Images
  userRouter.delete(
    "/file/delete/:fileName",
    UserProtectedGuard,
    RequestParamValidator(RequestFileNameParamDto),
    asyncHandler(async (req: Request, res: Response) => {
      const { fileName } = req.params;
      res.json(await fileUserController.removeImage(fileName));
    })
  );

  return userRouter;
}
