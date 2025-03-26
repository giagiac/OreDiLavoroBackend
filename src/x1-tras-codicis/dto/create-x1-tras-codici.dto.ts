import {
  // decorators here

  IsString,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateX1TrasCodiciDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  CODICE2?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  CODICE1: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
