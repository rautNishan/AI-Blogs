import { IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { USER_ROLE } from "../../../common/constants/roles.constant";
import { IFullName, IUser } from "../interfaces/user.interface";

export class UserFullName implements IFullName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export class UserCreateDto implements IUser {
  @ValidateNested({ each: true })
  @IsNotEmpty()
  fullName: UserFullName;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(USER_ROLE)
  @IsNotEmpty()
  role: USER_ROLE;
}
