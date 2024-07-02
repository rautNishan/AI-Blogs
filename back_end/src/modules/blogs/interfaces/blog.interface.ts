import { IBaseRepository } from "../../../database/interfaces/database.interfaces";
import { BlogEntity } from "../entities/blog.entity";

export interface IBlog {
  title: string;
  subTitle: string;
  description: string;
  userId: number;
}

export interface IBlogService extends IBaseRepository<BlogEntity> {}
