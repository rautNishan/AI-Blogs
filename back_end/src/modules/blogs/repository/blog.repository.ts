import { Repository } from "typeorm";
import { BaseRepository } from "../../../database/base/repository/base.repository";
import { BlogEntity } from "../entities/blog.entity";

export class BlogRepository extends BaseRepository<BlogEntity> {
  constructor(private readonly blogRepo: Repository<BlogEntity>) {
    super(blogRepo);
  }
}
