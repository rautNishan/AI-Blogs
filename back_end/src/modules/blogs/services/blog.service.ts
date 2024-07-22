import { DeepPartial } from "typeorm";
import { HttpStatusCode } from "../../../common/constants/http.status.code";
import { HttpException } from "../../../common/exceptions/http-exceptions";
import { DBConnection } from "../../../database/connection/connection";
import {
  ICreateOptions,
  IFindAllOptions,
  IFindByIdOptions,
  IFindOneOption,
  IOnlyEntityManager,
  IPaginatedData,
  IUpdateOptions,
} from "../../../database/interfaces/database.interfaces";
import { UserService } from "../../users/services/user.service";
import { BlogCreateDto } from "../dtos/blog.create.dto";
import { BlogEntity } from "../entities/blog.entity";
import { IBlog, IBlogService } from "../interfaces/blog.interface";
import { BlogRepository } from "../repository/blog.repository";

export class BlogService implements IBlogService {
  private _blogRepository: BlogRepository;
  public static _blogInstance: BlogService;

  private constructor() {
    const blogRepo = DBConnection.getConnection().getRepository(BlogEntity);
    this._blogRepository = new BlogRepository(blogRepo);
  }

  public static getInstance(): BlogService {
    if (!BlogService._blogInstance) {
      BlogService._blogInstance = new BlogService();
    }
    return BlogService._blogInstance;
  }

  private readonly _userService = UserService.getInstance();

  async create(data: IBlog, options?: ICreateOptions) {
    const user = await this._userService.getById(data.userId);
    if (!user) {
      throw new HttpException(HttpStatusCode.NOT_FOUND, "User Not Found");
    }
    return await this._blogRepository.create(data, options);
  }

  async update(
    data: DeepPartial<BlogEntity>,
    options?: IUpdateOptions | undefined
  ): Promise<BlogEntity> {
    return await this._blogRepository.update(data, options);
  }

  async getAll(
    options?: IFindAllOptions<BlogEntity> | undefined
  ): Promise<IPaginatedData<BlogEntity>> {
    return await this._blogRepository.getAll(options);
  }

  async getById(
    id: number,
    options?: IFindByIdOptions<BlogEntity> | undefined
  ): Promise<BlogEntity | null> {
    return await this._blogRepository.getById(id, options);
  }

  async getOne(
    options?: IFindOneOption<BlogEntity> | undefined
  ): Promise<BlogEntity | null> {
    return await this._blogRepository.getOne(options);
  }

  async findOneOrFail(
    id: number,
    options?: IFindByIdOptions<BlogEntity>
  ): Promise<BlogEntity> {
    console.log("This is Options in Service: ", options);

    return await this._blogRepository.findOneOrFail(id, options);
  }

  async softDelete(
    entity: BlogEntity,
    options?: IOnlyEntityManager | undefined
  ): Promise<BlogEntity> {
    return await this._blogRepository.softDelete(entity, options);
  }

  async hardDelete(
    entity: BlogEntity,
    options?: IOnlyEntityManager | undefined
  ): Promise<BlogEntity> {
    return await this._blogRepository.hardDelete(entity, options);
  }

  async restore(
    entity: BlogEntity,
    options?: IOnlyEntityManager | undefined
  ): Promise<BlogEntity> {
    return await this._blogRepository.restore(entity, options);
  }
}
