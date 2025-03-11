import {
  IsOptional,
  // decorators here
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { TipoCosto } from '../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';

export class CreateArticoliCostiCfCommDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  TIPO_COSTO?: TipoCosto | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  COD_ART?: string | null;

  // @ApiProperty({
  //   required: true,
  //   type: () => String,
  // })
  // @IsString()
  // CF_COMM_ID: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
