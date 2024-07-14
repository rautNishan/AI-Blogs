import {
  IBaseRepository,
  IFindByIdOptions,
} from "../../../database/interfaces/database.interfaces";
import { BlogEntity } from "../entities/blog.entity";

export interface IBlog {
  title: string;
  subTitle: string;
  description: string;
  userId: number;
  tags: string[];
}

export interface IBlogService extends IBaseRepository<BlogEntity> {
  findOneOrFail(
    id: number,
    options?: IFindByIdOptions<BlogEntity>
  ): Promise<BlogEntity>;
}
