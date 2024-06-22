import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";
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

  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  password: string;

  @IsEnum(USER_ROLE)
  @IsNotEmpty()
  @MaxLength(250)
  role: USER_ROLE;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  email?: string | undefined;
}
