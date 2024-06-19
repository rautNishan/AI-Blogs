import { DataSource } from "typeorm";
import { UserCreateDto } from "../dtos/user.create.dto";
import { UserService } from "../services/user.service";
import { DBConnection } from "../../../database/connection/connection";

export class UserController {
  private _userService: UserService;
  public connection: DataSource;
  constructor() {
    this._userService = UserService.getInstance();
    this.connection = DBConnection.getConnection();
  }

  async create(data: UserCreateDto) {
    try {
      return await this._userService.create(data);
    } catch (error) {
      throw error;
    } finally {
    }
  }
}
