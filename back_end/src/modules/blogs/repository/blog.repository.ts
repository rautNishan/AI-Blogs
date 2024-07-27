import {
  FindOptionsSelect,
  FindOptionsSelectByString,
  Repository,
} from "typeorm";
import { BaseRepository } from "../../../database/base/repository/base.repository";
import { BlogEntity } from "../entities/blog.entity";
import { ICommonRepository } from "../../../common/repositories/interfaces/repository.common.interface";
import { IFindByIdOptions } from "../../../database/interfaces/database.interfaces";
import { HttpException } from "../../../common/exceptions/http-exceptions";
import { HttpStatusCode } from "../../../common/constants/http.status.code";

export class BlogRepository
  extends BaseRepository<BlogEntity>
  implements ICommonRepository<BlogEntity>
{
  constructor(private readonly blogRepo: Repository<BlogEntity>) {
    super(blogRepo);
  }

  async findOneOrFail(
    id: number,
    options?: IFindByIdOptions<BlogEntity>
  ): Promise<BlogEntity> {
    let data: BlogEntity | null;

    const where: Record<string, any> | any = options?.options?.where ?? {};
    where["id"] = id;

    console.log("This is Where: ", where);

    const select: FindOptionsSelect<BlogEntity> | any =
      options?.options?.select;

    if (options?.entityManager) {
      console.log("This is For Entity Manager");

      data = await options.entityManager.findOne(this.blogRepo.target, {
        where: where,
        select: select,
      });
    }

    data = await this.blogRepo.findOne({
      where: where,
      select: select,
    });

    if (!data) {
      throw new HttpException(
        HttpStatusCode.NOT_FOUND,
        "Blog with that id was not found"
      );
    }
    return data;
  }
}
