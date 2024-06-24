import { DataSource } from "typeorm";
import { UserCreateDto } from "../dtos/user.create.dto";
import { UserService } from "../services/user.service";
import { DBConnection } from "../../../database/connection/connection";
import { ICreateOptions } from "../../../database/interfaces/database.interfaces";
import { USER_ROLE } from "../../../common/constants/roles.constant";
import { UserEntity } from "../entity/user.entity";
import { IPaginatedRequest } from "../../../common/request/interfaces/request.paginated.interface";
import { RequestListQueryDto } from "../../../common/request/query/request.list.query.dto";

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
      return createdData;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  //Accept pagination query
  async getAll(options?: RequestListQueryDto) {
    return await this._userService.getAll({
      withDeleted: options?.withDeleted,
      options: {
        skip: Number(options?.page),
        take: Number(options?.limit),
      },
    });
  }

  //Accept id
  async getById() {}
}
