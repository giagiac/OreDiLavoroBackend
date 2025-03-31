import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { OthersFiltersDto } from '../../utils/dto/others-filters';
import { FilterDto, SortDto } from '../../utils/dto/filter-column';
import { EpsNestjsTargaMezzi } from '../domain/eps-nestjs-targa-mezzi';
import { EpsNestjsTargaMezziDto, JoinDto } from './eps-nestjs-targa-mezzi.dto';

export class FindAllEpsNestjsTargaMezziDto {
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
        ? plainToInstance(Array<FilterDto<EpsNestjsTargaMezziDto>>, JSON.parse(value))
        : undefined,
    )
    @ValidateNested({ each: true })
    @Type(() => FilterDto)
    filters?: FilterDto<EpsNestjsTargaMezziDto>[] | null;
  
    @IsArray()
    @IsOptional()
    @Transform(({ value }) => {
      return value
        ? plainToInstance(Array<SortDto<EpsNestjsTargaMezziDto>>, JSON.parse(value))
        : undefined;
    })
    @ValidateNested({ each: true })
    @Type(() => SortDto)
    sort?: SortDto<EpsNestjsTargaMezziDto>[] | null;
}
