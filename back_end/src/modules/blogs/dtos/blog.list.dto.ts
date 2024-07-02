import { IsNumber, IsOptional } from "class-validator";
import { RequestListQueryDto } from "../../../common/request/query/request.list.query.dto";
import { Transform } from "class-transformer";

export class BlogListDto extends RequestListQueryDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  userId?: number;

  
}
