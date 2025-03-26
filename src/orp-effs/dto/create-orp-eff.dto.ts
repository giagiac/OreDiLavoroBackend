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

export class CreateOrpEffDto {
  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  DATA_DOC: Date;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  SERIE_DOC: string;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  NUM_DOC: number;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  ANNO_DOC: string;

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
