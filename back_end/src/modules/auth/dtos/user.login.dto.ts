import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { ILoginIncomingData } from "../interfaces/auth.interfaces";

export class UserLoginDto implements ILoginIncomingData {
  @IsString()
  @IsOptional()
  userName?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
