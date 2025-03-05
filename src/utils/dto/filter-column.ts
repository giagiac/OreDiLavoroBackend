import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class FilterDto<T> {
  @ApiPropertyOptional()
  @Type(() => String)
  @IsString()
  columnName: keyof T;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsString()
  value: string;
}