import {
  // decorators here

  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateOrdCliRigheDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  DES_RIGA?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  COD_ART?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  COD_CF?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  DOC_RIGA_ID: string;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  NUM_RIGA: number;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  DOC_ID: string;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  AZIENDA_ID?: number | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
