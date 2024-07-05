import { DeepPartial } from "typeorm";
import { BlogEntity } from "../entities/blog.entity";

export class BlogSerialization {
  private id: number | undefined;
  private title: string | undefined;
  private subTitle: string | undefined;
  private description: string | undefined;
  private userId: number | undefined;
  constructor(blogData: DeepPartial<BlogEntity>) {
    this.id = blogData.id;
    this.title = blogData.title;
    this.subTitle = blogData.subTitle;
    this.description = blogData.description;
    this.userId = blogData.userId;
  }
}
