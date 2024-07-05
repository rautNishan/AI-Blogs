import express, { Request, Response, Router } from "express";
import { asyncHandler } from "../utils/async.handler";
import { UserController } from "../modules/users/controllers/user.controller";
import { RequestBodyValidation } from "../common/request/validator/request.body.validator";
import { UserCreateDto } from "../modules/users/dtos/user.create.dto";
import { UserProtectedGuard } from "../common/request/guards/authenticated.user";
import { BlogAdminController } from "../modules/blogs/controllers/blog.admin.controller";
import { BlogCreateDto } from "../modules/blogs/dtos/blog.create.dto";
import { RequestParamValidator } from "../common/request/validator/request.param.validator";
import { RequestIdParamDto } from "../common/request/param/request.id.param.dto";
import { RESPONSE_META } from "../common/response/constants/response.constant";
import { RequestQueryValidator } from "../common/request/validator/request.query.validator";
import { RequestListQueryDto } from "../common/request/query/request.list.query.dto";
import { BlogListDto } from "../modules/blogs/dtos/blog.list.dto";
import { UserAdminController } from "../modules/users/controllers/user.admin.controller";

export function adminRouterFactory(): Router {
  const adminRouter: Router = express.Router();

  const userAdminController = new UserAdminController();

  //User Routes
  adminRouter.post(
    "/user/create",
    UserProtectedGuard,
    RequestBodyValidation(UserCreateDto),
    asyncHandler(async (req: Request, res: Response) => {
      return await userAdminController.create(req.body);
    })
  );

  //Blogs
  const blogController = new BlogAdminController();

  adminRouter.post(
    "/blog/create",
    UserProtectedGuard,
    RequestBodyValidation(BlogCreateDto),
    asyncHandler(async (req: Request, res: Response) => {
      const data = await blogController.create(req.body);
      res.json(data);
    })
  );

  adminRouter.get(
    "/blog/info/:id",
    UserProtectedGuard,
    RequestParamValidator(RequestIdParamDto),
    asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      const data = await blogController.getById(Number(id));
      res[RESPONSE_META.RESPONSE_MESSAGE] = "Blog Retrived Successfully";
      res.json(data);
    })
  );

  adminRouter.get(
    "/blog/list",
    UserProtectedGuard,
    RequestQueryValidator(BlogListDto),
    asyncHandler(async (req: Request, res: Response) => {
      const query = req.query;
      const data = await blogController.getAll(query);
      res[RESPONSE_META.RESPONSE_MESSAGE] = "Blog Retrived Successfully";
      res.json(data);
    })
  );
  return adminRouter;
}
