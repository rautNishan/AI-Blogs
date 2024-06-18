import { Repository } from "typeorm";
import { DBConnection } from "../../../database/connection/connection";
import { UserEntity } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";

export class UserService {
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

  async create(data: any) {
    console.log("This is Data in User Service: ", data);
    return await this._userRepository.create(data);
  }
}
