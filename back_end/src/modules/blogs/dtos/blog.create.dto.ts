import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";

export class BlogCreateDto {
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

  userId?: number | null;

  @IsOptional()
  @IsArray()
  tags: string[];
}
