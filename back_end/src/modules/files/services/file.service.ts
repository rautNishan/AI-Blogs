import { Repository } from "typeorm";
import { DBConnection } from "../../../database/connection/connection";
import { FileEntity } from "../entities/file.entity";
import { FileRepository } from "../repository/file.repository";
import { FileImageUploadDto } from "../dtos/file.images.upload.dto";
import {
  ICreateOptions,
  IFindOneOption,
  IOnlyEntityManager,
  ISoftDelete,
} from "../../../database/interfaces/database.interfaces";

export class FileService {
  private static _instance: FileService;
  private _fileRepo: FileRepository;

  private constructor() {
    const _repo: Repository<FileEntity> =
      DBConnection.getConnection().getRepository(FileEntity);
    this._fileRepo = new FileRepository(_repo);
  }

  public static getInstance() {
    if (!FileService._instance) {
      FileService._instance = new FileService();
    }
    return FileService._instance;
  }

  async create(
    data: FileImageUploadDto,
    options?: ICreateOptions
  ): Promise<FileEntity> {
    return await this._fileRepo.create(data, options);
  }

  async findOneOrFail(image: string, options?: IFindOneOption<FileEntity>) {
    return await this._fileRepo.findOneOrFail(image, options);
  }

  async softDelete(
    file: FileEntity,
    options?: IOnlyEntityManager
  ): Promise<FileEntity> {
    return await this._fileRepo.softDelete(file, options);
  }
}
