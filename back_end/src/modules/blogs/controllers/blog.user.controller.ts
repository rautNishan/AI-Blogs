import { QueryRunner } from "typeorm";
import { DBConnection } from "../../../database/connection/connection";
import { ICreateOptions } from "../../../database/interfaces/database.interfaces";
import { BlogCreateDto } from "../dtos/blog.create.dto";
import { BlogEntity } from "../entities/blog.entity";
import { BlogService } from "../services/blog.service";
import { BlogSerialization } from "../serializations/blog.serialization";

export class BlogUserController {
  private readonly _blogService: BlogService;
  constructor() {
    this._blogService = BlogService.getInstance();
  }

  async create(
    incomingData: BlogCreateDto,
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
}
