import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { CfComm } from '../domain/cf-comm';
import { OthersFiltersDto } from '../../utils/dto/others-filters';
import { CfCommDto, JoinDto } from './cf-comm.dto';
import { FilterDto } from '../../utils/dto/filter-column';

export class SortCfCommDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof CfComm;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FindAllCfCommDto {
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
      ? plainToInstance(Array<FilterDto<CfCommDto>>, JSON.parse(value))
      : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  filters?: FilterDto<CfCommDto>[] | null;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(Array<SortCfCommDto>, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortCfCommDto)
  sort?: SortCfCommDto[] | null;
}
