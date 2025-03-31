import {
  // decorators here

  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateEpsNestjsTargaMezziDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  COD_ART: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
