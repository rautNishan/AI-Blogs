import { DeepPartial, Repository } from "typeorm";
import { DBConnection } from "../../../database/connection/connection";
import {
  ICreateOptions,
  IFindOneOption,
  IOnlyEntityManager,
  IUpdateOptions,
} from "../../../database/interfaces/database.interfaces";
import { FileImageUploadDto } from "../dtos/file.images.upload.dto";
import { FileEntity } from "../entities/file.entity";
import { FileRepository } from "../repository/file.repository";
import { FILE_ASSOCIATED_TYPE } from "../../../common/file/constants/file.constants";

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

  async update(
    data: DeepPartial<FileEntity>,
    options?: IUpdateOptions | undefined
  ): Promise<FileEntity> {
    return await this._fileRepo.update(data, options);
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

  async hardDelete(
    entity: FileEntity,
    options?: IOnlyEntityManager | undefined
  ): Promise<FileEntity> {
    return await this._fileRepo.hardDelete(entity, options);
  }

  async updateBlogWithAssociation(
    imageName: string,
    incomingAssociation: {
      associationId: number;
      associationType: FILE_ASSOCIATED_TYPE;
    },
    options?: IUpdateOptions | undefined
  ) {
    const existingImage: FileEntity = await this.findOneOrFail(imageName);
    existingImage.associatedType = incomingAssociation.associationType;
    existingImage.associationId = incomingAssociation.associationId;
    await this.update(existingImage, options);
  }
}
