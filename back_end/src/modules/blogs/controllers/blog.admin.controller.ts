import { QueryRunner } from "typeorm";
import { HttpStatusCode } from "../../../common/constants/http.status.code";
import { HttpException } from "../../../common/exceptions/http-exceptions";
import { DBConnection } from "../../../database/connection/connection";
import {
  ICreateOptions,
  IFindByIdOptions,
} from "../../../database/interfaces/database.interfaces";
import { BlogCreateDto } from "../dtos/blog.create.dto";
import { BlogListDto } from "../dtos/blog.list.dto";
import { BlogEntity } from "../entities/blog.entity";
import { BlogService } from "../services/blog.service";

export class BlogAdminController {
  private readonly _blogService: BlogService;
  constructor() {
    this._blogService = BlogService.getInstance();
  }

  async create(
    incomingData: BlogCreateDto,
    options?: ICreateOptions
  ): Promise<BlogEntity> {
    const queryRunner: QueryRunner =
      DBConnection.getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const data = await this._blogService.create(incomingData, {
        entityManager: queryRunner.manager,
      });
      await queryRunner.commitTransaction();
      return data;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getById(
    id: number,
    options?: IFindByIdOptions<BlogEntity>
  ): Promise<BlogEntity> {
    try {
      const data: BlogEntity | null = await this._blogService.getById(
        id,
        options
      );
      if (!data) {
        throw new HttpException(
          HttpStatusCode.NOT_FOUND,
          "Blog with that id was not found."
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAll(options?: BlogListDto) {
    return await this._blogService.getAll({
      options: {
        skip: options?.page,
        take: options?.limit,
        where: { userId: options?.userId },
      },
      withDeleted: options?.withDeleted,
    });
  }
}
