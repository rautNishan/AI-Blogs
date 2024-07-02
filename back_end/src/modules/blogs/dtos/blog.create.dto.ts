import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from "class-validator";
import { IBlog } from "../interfaces/blog.interface";

export class BlogCreateDto implements IBlog {
  @IsString()
  @MaxLength(250)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(250)
  @IsNotEmpty()
  subTitle: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  userId: number;
}
