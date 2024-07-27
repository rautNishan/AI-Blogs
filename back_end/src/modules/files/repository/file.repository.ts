import { FindOptionsSelect, Repository } from "typeorm";
import { HttpStatusCode } from "../../../common/constants/http.status.code";
import { HttpException } from "../../../common/exceptions/http-exceptions";
import { BaseRepository } from "../../../database/base/repository/base.repository";
import { IFindByIdOptions } from "../../../database/interfaces/database.interfaces";
import { FileEntity } from "../entities/file.entity";

export class FileRepository extends BaseRepository<FileEntity> {
  constructor(private readonly _fileRepo: Repository<FileEntity>) {
    super(_fileRepo);
  }

  async findOneOrFail(
    file: string,
    options?: IFindByIdOptions<FileEntity>
  ): Promise<FileEntity> {
    let data: FileEntity | null;
    const where: Record<string, any> | any = options?.options?.where ?? {};
    where["fileName"] = file;

    const select: FindOptionsSelect<FileEntity> | any =
      options?.options?.select;

    if (options?.entityManager) {
      data = await options.entityManager.findOne(this._fileRepo.target, {
        where: where,
        select: select,
      });
    }

    data = await this._fileRepo.findOne({
      where: where,
      select: select,
    });

    if (!data) {
      throw new HttpException(HttpStatusCode.NOT_FOUND, "File was not found");
    }
    return data;
  }
}
