import { Column, Entity } from "typeorm";
import { USER_ROLE } from "../../../common/constants/roles.constant";
import { DataBaseBaseEntity } from "../../../database/base/entity/base.entity";
import { IFullName, IUser } from "../interfaces/user.interface";

export const USER_TABLE_NAME = "users";

@Entity({ name: USER_TABLE_NAME })
export class UserEntity extends DataBaseBaseEntity implements IUser {
  @Column({
    name: "full_name",
    type: "jsonb",
    nullable: false,
  })
  fullName: IFullName;

  @Column({
    name: "password",
    type: "varchar",
    length: 250,
    nullable: false,
  })
  password: string;

  @Column({
    name: "role",
    type: "varchar",
    length: 250,
    nullable: false,
  })
  role: USER_ROLE;

  @Column({
    name: "email",
    type: "varchar",
    length:250,
    nullable:true
  })
  email?: string;

  @Column({
    name:'user_name',
    type:'varchar',
    length:250,
    nullable:false
  })
  userName: string;
}
