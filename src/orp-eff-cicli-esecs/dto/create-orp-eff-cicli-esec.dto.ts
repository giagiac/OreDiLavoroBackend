import { OrpEffCicliDto } from '../../orp-eff-ciclis/dto/orp-eff-cicli.dto';

import {
  // decorators here

  IsNumber,
  IsOptional,
  IsString,
  IsDate,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here

  Transform,
} from 'class-transformer';

export class CreateOrpEffCicliEsecDto {
  orpEffCicli?: OrpEffCicliDto | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  DATA_FINE?: Date | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  DATA_INIZIO?: Date | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  TEMPO_OPERATORE?: number | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  DOC_RIGA_ESEC_ID: string;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  NUM_ESEC?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  DOC_RIGA_ID?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  NUM_RIGA?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  DOC_ID?: string | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  AZIENDA_ID?: number | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
