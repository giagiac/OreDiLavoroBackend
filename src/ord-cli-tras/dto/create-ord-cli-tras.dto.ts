import {
  // decorators here

  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateOrdCliTrasDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  DOC_ID: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  NOTE_DEST_MERCE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  TEL_DEST_MERCE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  STATO_DEST_MERCE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  PROVINCIA_DEST_MERCE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  CAP_DEST_MERCE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  COMUNE_DEST_MERCE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  INDI_DEST_MERCE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  DES_DEST_MERCE?: string | null;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  NUM_DEST: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
