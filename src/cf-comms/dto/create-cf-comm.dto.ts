import {
  IsNumber,
  IsOptional,
  // decorators here
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateCfCommDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  NOTE_SEDE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  RIFERIMENTO_SEDE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  E_MAIL_SEDE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  FAX_SEDE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  TEL_SEDE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  PROVINCIA_SEDE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  COMUNE_SEDE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  CAP_SEDE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  INDI_SEDE?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  CF_COMM_ID: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  COD_CF: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  DES_SEDE?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  NUM_SEDE: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  X_ZONA?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
