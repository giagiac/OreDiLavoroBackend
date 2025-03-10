import {
  // decorators here
  IsNumber,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreatensorpeffcicliesecDto {
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
    required: true,
    type: () => Number,
  })
  @IsNumber()
  AZIENDA_ID: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
