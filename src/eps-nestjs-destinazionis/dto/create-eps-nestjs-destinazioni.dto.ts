import {
  // decorators here

  IsString,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateEpsNestjsDestinazioniDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  RESPONSE: string;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  VALUE: number;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  KM: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  LINK: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
