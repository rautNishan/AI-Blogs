import { Entity } from "typeorm";
import { DataBaseBaseEntity } from "../../../database/base/entity/base.entity";

export const USER_TABLE_NAME = "users";

@Entity({ name: USER_TABLE_NAME })
export class UserEntity extends DataBaseBaseEntity {}
