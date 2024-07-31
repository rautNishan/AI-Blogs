import { FindOptionsSelect, Repository } from "typeorm";
import { BaseRepository } from "../../../database/base/repository/base.repository";
import { UserEntity } from "../entities/user.entity";
import { IFindByIdOptions } from "../../../database/interfaces/database.interfaces";
import { HttpException } from "../../../common/exceptions/http-exceptions";
import { HttpStatusCode } from "../../../common/constants/http.status.code";

export class UserRepository extends BaseRepository<UserEntity> {
  constructor(private readonly repo: Repository<UserEntity>) {
    super(repo);
  }

  async findOneOrFailById(
    id: number,
    options?: IFindByIdOptions<UserEntity>
  ): Promise<UserEntity> {
    let data: UserEntity | null;

    const where: Record<string, any> | any = options?.options?.where ?? {};
    where["id"] = id;

    const select: FindOptionsSelect<UserEntity> | any =
      options?.options?.select;

    if (options?.entityManager) {
      data = await options.entityManager.findOne(this.repo.target, {
        where: where,
        select: select,
        ...options?.options,
      });
    }

    data = await this.repo.findOne({
      where: where,
      select: select,
      ...options?.options,
    });

    if (!data) {
      throw new HttpException(
        HttpStatusCode.NOT_FOUND,
        "User with that id was not found"
      );
    }
    return data;
  }
}
