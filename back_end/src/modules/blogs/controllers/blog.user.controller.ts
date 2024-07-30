import { QueryRunner } from "typeorm";
import { DBConnection } from "../../../database/connection/connection";
import {
  ICreateOptions,
  IFindByIdOptions,
  IPaginatedData,
} from "../../../database/interfaces/database.interfaces";
import { BlogEntity } from "../entities/blog.entity";
import { BlogService } from "../services/blog.service";
import { BlogSerialization } from "../serializations/blog.serialization";
import { BlogListDto } from "../dtos/blog.list.dto";
import { IBlog } from "../interfaces/blog.interface";

export class BlogUserController {
  private readonly _blogService: BlogService;
  constructor() {
    this._blogService = BlogService.getInstance();
  }

  async create(
    incomingData: IBlog,
    options?: ICreateOptions
  ): Promise<BlogEntity | BlogSerialization> {
    const queryRunner: QueryRunner =
      DBConnection.getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const data: BlogEntity = await this._blogService.create(incomingData, {
        entityManager: queryRunner.manager,
      });
      await queryRunner.commitTransaction();
      const returnData = new BlogSerialization(data);
      return returnData;
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
      let data: BlogEntity | null;
      if (options?.protectedUserId) {
        data = await this._blogService.findOneOrFail(id, {
          options: {
            where: { userId: options.protectedUserId },
            select: [
              "id",
              "title",
              "subTitle",
              "userId",
              "description",
              "tags",
              "photos",
            ],
            relations: ["photos"],
          },
          ...options,
        });

        return data;
      }
      data = await this._blogService.findOneOrFail(id, {
        ...options,
        options: {
          select: [
            "id",
            "title",
            "subTitle",
            "userId",
            "tags",
            "photos",
            "description",
          ],
          relations: ["photos"],
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAll(options?: BlogListDto): Promise<IPaginatedData<BlogEntity>> {
    return await this._blogService.getAll({
      options: {
        skip: options?.page,
        take: options?.limit,
        where: { userId: options?.userId },
        select: ["id", "title", "subTitle", "userId", "tags", "photos"],
        relations: ["photos"],
      },
      withDeleted: options?.withDeleted,
    });
  }
}
