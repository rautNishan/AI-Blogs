import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FileImageUploadDto {
  @IsNotEmpty()
  @IsString()
  path: string;

  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsString()
  mime: string;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsOptional()
  @IsString()
  description?: string | null;
}
