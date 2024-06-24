import {
  IsBoolean,
  IsBooleanString,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { EntityManager } from "typeorm";

export class RequestListQueryDto {
  @IsString()
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  page?: number;

  @IsBooleanString()
  @IsOptional()
  withDeleted?: boolean;
}
