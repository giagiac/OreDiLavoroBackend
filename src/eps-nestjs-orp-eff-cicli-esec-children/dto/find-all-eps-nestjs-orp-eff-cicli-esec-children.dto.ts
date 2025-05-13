import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { EpsNestjsOrpEffCicliEsecDto } from '../../eps-nestjs-orp-eff-cicli-esecs/dto/esp-nestjs-orp-eff-cicli-esec.dto';
import { FilterDto, SortDto } from '../../utils/dto/filter-column';
import { OthersFiltersDto } from '../../utils/dto/others-filters';
import { JoinDto } from './eps-nestjs-orp-eff-cicli-esec-child.dto';

export class FindAllEpsNestjsOrpEffCicliEsecChildrenDto {
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
    @Transform(({ value }) => (value ? plainToInstance(Array<OthersFiltersDto<JoinDto>>, JSON.parse(value)) : undefined))
    @ValidateNested({ each: true })
    @Type(() => OthersFiltersDto)
    othersFilters?: OthersFiltersDto<JoinDto>[] | null;
  
    @IsArray()
    @IsOptional()
    @Transform(({ value }) => (value ? plainToInstance(Array<FilterDto<EpsNestjsOrpEffCicliEsecDto>>, JSON.parse(value)) : undefined))
    @ValidateNested({ each: true })
    @Type(() => FilterDto)
    filters?: FilterDto<EpsNestjsOrpEffCicliEsecDto>[] | null;
  
    @IsArray()
    @IsOptional()
    @Transform(({ value }) => {
      return value ? plainToInstance(Array<SortDto<EpsNestjsOrpEffCicliEsecDto>>, JSON.parse(value)) : undefined;
    })
    @ValidateNested({ each: true })
    @Type(() => SortDto)
    sort?: SortDto<EpsNestjsOrpEffCicliEsecDto>[] | null;
}
