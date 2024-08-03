import { DeepPartial, Repository } from "typeorm";
import { DBConnection } from "../../../database/connection/connection";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repository/user.repository";
import { UserCreateDto } from "../dtos/user.create.dto";
import { IUserService } from "../interfaces/user.interface";
import {
  ICreateOptions,
  IFindAllOptions,
  IFindByIdOptions,
  IFindOneOption,
  IOnlyEntityManager,
  IPaginatedData,
  IUpdateOptions,
} from "../../../database/interfaces/database.interfaces";
import * as bcrypt from "bcrypt";
import { HttpException } from "../../../common/exceptions/http-exceptions";
import { HttpStatusCode } from "../../../common/constants/http.status.code";

export class UserService implements IUserService<UserEntity> {
  private _userRepository: UserRepository;

  private static _userInstance: UserService;

  private constructor() {
    const _repo: Repository<UserEntity> =
      DBConnection.getConnection().getRepository(UserEntity);
    this._userRepository = new UserRepository(_repo);
  }

  public static getInstance(): UserService {
    if (!UserService._userInstance) {
      //If it is static use Class name instead of this keyword
      UserService._userInstance = new UserService();
    }
    return UserService._userInstance;
  }

  async create(data: UserCreateDto, options?: ICreateOptions) {
    await this.checkForUserConflict(data, options);
    data.password = await bcrypt.hash(data.password, 10);
    return await this._userRepository.create(data, options);
  }

  async update(
    data: DeepPartial<UserEntity>,
    options?: IUpdateOptions | undefined
  ): Promise<UserEntity> {
    return await this._userRepository.update(data, options);
  }

  async getById(
    id: number,
    options?: IFindByIdOptions<UserEntity>
  ): Promise<UserEntity | null> {
    return await this._userRepository.getById(id, options);
  }

  async getOne(
    options?: IFindOneOption<UserEntity> | undefined
  ): Promise<UserEntity | null> {
    return await this._userRepository.getOne(options);
  }

  async getAll(
    options?: IFindAllOptions<UserEntity>
  ): Promise<IPaginatedData<UserEntity>> {
    return this._userRepository.getAll(options);
  }

  async softDelete(
    entity: UserEntity,
    options?: IOnlyEntityManager
  ): Promise<UserEntity> {
    return await this._userRepository.softDelete(entity, options);
  }
  async restore(
    entity: UserEntity,
    options?: IOnlyEntityManager
  ): Promise<UserEntity> {
    return await this._userRepository.restore(entity, options);
  }

  async hardDelete(
    entity: UserEntity,
    options?: IOnlyEntityManager
  ): Promise<UserEntity> {
    return await this._userRepository.hardDelete(entity, options);
  }

  async getByEmail(
    email: string,
    options?: IFindOneOption<UserEntity>
  ): Promise<UserEntity | null> {
    return await this._userRepository.getOne({
      options: {
        where: { email: email },
      },
      ...options,
    });
  }

  async getByUserName(
    userName: string,
    options?: IFindOneOption<UserEntity>
  ): Promise<UserEntity | null> {
    return await this._userRepository.getOne({
      options: { where: { userName: userName } },
      ...options,
    });
  }

  async updateById(
    id: number,
    dataToUpdate: DeepPartial<UserEntity>,
    options?: IUpdateOptions
  ): Promise<UserEntity> {
    const existingUser = await this._userRepository.findOneOrFailById(id);
    if (dataToUpdate.password) {
      existingUser.password = dataToUpdate.password;
    }
    return await this._userRepository.update(existingUser, options);
  }

  async checkForUserConflict(
    data: UserCreateDto,
    options?: ICreateOptions
  ): Promise<void> {
    let existingUser: UserEntity | null;

    existingUser = await this.getByEmail(data.email, options);

    if (existingUser) {
      throw new HttpException(HttpStatusCode.CONFLICT, "User Exists");
    }

    existingUser = await this.getByUserName(data.userName, options);

    if (existingUser) {
      throw new HttpException(HttpStatusCode.CONFLICT, "User Exists");
    }
  }
}
