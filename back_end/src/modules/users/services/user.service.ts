import { Repository } from "typeorm";
import { DBConnection } from "../../../database/connection/connection";
import { UserEntity } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";

export class UserService {
  private _userRepository: UserRepository;

  constructor() {
    const _repo: Repository<UserEntity> =
      DBConnection.getConnection().getRepository(UserEntity);
    this._userRepository = new UserRepository(_repo);
  }

  async create(data: any) {
    return await this._userRepository.create(data);
  }
}
