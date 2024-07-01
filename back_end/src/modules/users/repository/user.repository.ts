import { Repository } from "typeorm";
import { BaseRepository } from "../../../database/base/repository/base.repository";
import { UserEntity } from "../entities/user.entity";

export class UserRepository extends BaseRepository<UserEntity> {
  constructor(private readonly repo: Repository<UserEntity>) {
    super(repo);
  }
}
