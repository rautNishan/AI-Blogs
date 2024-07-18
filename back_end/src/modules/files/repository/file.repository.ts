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
    console.log("This is Options in Repository: ", options);

    const where: Record<string, any> | any = options?.options?.where ?? {};
    where["fileName"] = file;

    const select: FindOptionsSelect<FileEntity> | any =
      options?.options?.select;

    if (options?.entityManager) {
      console.log("This is For Entity Manager");

      data = await options.entityManager.findOne(this._fileRepo.target, {
        where: where,
        select: select,
      });
    }
    console.log("This is where: ", where);
    console.log("This is Select: ", select);

    data = await this._fileRepo.findOne({
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
