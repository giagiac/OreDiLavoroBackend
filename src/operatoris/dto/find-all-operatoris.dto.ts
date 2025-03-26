import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { JoinDto, OperatoriDto } from './operatori.dto';
import { FilterDto, SortDto } from '../../utils/dto/filter-column';
import { OthersFiltersDto } from '../../utils/dto/others-filters';
import { Operatori } from '../domain/operatori';

export class FindAllOperatorisDto {
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
      ? plainToInstance(Array<FilterDto<OperatoriDto>>, JSON.parse(value))
      : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  filters?: FilterDto<OperatoriDto>[] | null;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(Array<SortDto<OperatoriDto>>, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortDto)
  sort?: SortDto<OperatoriDto>[] | null;
}
