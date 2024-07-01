import { ICreateOptions } from "../../../database/interfaces/database.interfaces";
import { BlogCreateDto } from "../dtos/blog.create.dto";
import { BlogService } from "../services/blog.service";

export class BlogUserController {
  private readonly _blogService: BlogService;
  constructor() {
    this._blogService = BlogService.getInstance();
  }

  async create(data: BlogCreateDto, options?: ICreateOptions) {
    return await this._blogService.create(data, options);
  }
}
