import { DataSource } from "typeorm";
import { USER_ROLE } from "../../../common/constants/roles.constant";
import { RequestListQueryDto } from "../../../common/request/query/request.list.query.dto";
import { DBConnection } from "../../../database/connection/connection";
import {
  ICreateOptions,
  IFindByIdOptions,
} from "../../../database/interfaces/database.interfaces";
import { UserCreateDto } from "../dtos/user.create.dto";
import { UserEntity } from "../entities/user.entity";
import { UserService } from "../services/user.service";
import { UserIdSerialization } from "../serializations/user.id.serialization";

export class UserController {
  private _userService: UserService;
  public connection: DataSource;
  constructor() {
    this._userService = UserService.getInstance();
    this.connection = DBConnection.getConnection();
  }

  async create(data: UserCreateDto, options?: ICreateOptions) {
    const queryRunner = this.connection.createQueryRunner();
    queryRunner.startTransaction();
    try {
      data.role = USER_ROLE.USER;
      const createdData = await this._userService.create(data, options);
      await queryRunner.commitTransaction();
      const returnData = new UserIdSerialization(createdData.id);
      return returnData;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  //Accept pagination query
  async getAll(options?: RequestListQueryDto) {
    const data = await this._userService.getAll({
      options: {
        skip: options?.page,
        take: options?.limit,
        select: ["id", "email", "userName"],
      },
      withDeleted: options?.withDeleted,
    });
    return data;
  }

  //Accept id
  async getById(id: number, options?: IFindByIdOptions<UserEntity>) {
    return await this._userService.getById(id, {
      options: {
        select: ["id", "email", "userName"],
      },
    });
  }
}
