import { DataSource, Repository } from "typeorm";
import { BaseRepository } from "../../../database/base/repository/base.repository";
import { UserEntity } from "../entity/user.entity";
import { DBConnection } from "../../../database/connection/connection";

export class UserRepository extends BaseRepository<UserEntity> {
  constructor(private readonly repo: Repository<UserEntity>) {
    super(repo);
  }
}
