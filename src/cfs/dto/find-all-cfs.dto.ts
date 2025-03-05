import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Cf } from '../domain/cf';
import { FilterDto } from '../../utils/dto/filter-column';
import { CfDto, JoinDto } from './cf.dto';
import { OthersFiltersDto } from '../../utils/dto/others-filters';

export class SortCfDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Cf;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FindAllCfsDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    value
      ? plainToInstance(Array<OthersFiltersDto<JoinDto>>, JSON.parse(value))
      : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => OthersFiltersDto)
  othersFilters?: OthersFiltersDto<JoinDto>[] | null;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    value
      ? plainToInstance(Array<FilterDto<CfDto>>, JSON.parse(value))
      : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  filters?: FilterDto<CfDto>[] | null;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(Array<SortCfDto>, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortCfDto)
  sort?: SortCfDto[] | null;
}
