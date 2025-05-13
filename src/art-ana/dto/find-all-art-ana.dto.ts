import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ArtAna } from '../domain/art-ana';
import { OthersFiltersDto } from '../../utils/dto/others-filters';
import { FilterDto } from '../../utils/dto/filter-column';
import { ArtAnaDto, JoinDto } from './art-ana.dto';

// export class FindAllart_anaDto {
//   @ApiPropertyOptional()
//   @Transform(({ value }) => (value ? Number(value) : 1))
//   @IsNumber()
//   @IsOptional()
//   page?: number;

//   @ApiPropertyOptional()
//   @Transform(({ value }) => (value ? Number(value) : 10))
//   @IsNumber()
//   @IsOptional()
//   limit?: number;

//   @ApiProperty()
//   @IsString()
//   @IsNotEmpty()
//   COD_ART: String;
// }

export class SortArtAnaDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof ArtAna;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FindAllArtAnaDto {
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
  @Transform(({ value }) => (value ? plainToInstance(Array<FilterDto<ArtAnaDto>>, JSON.parse(value)) : undefined))
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  filters?: FilterDto<ArtAnaDto>[] | null;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(Array<SortArtAnaDto>, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortArtAnaDto)
  sort?: SortArtAnaDto[] | null;
}
