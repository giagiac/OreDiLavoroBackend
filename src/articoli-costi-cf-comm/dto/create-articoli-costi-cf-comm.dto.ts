import {
  IsOptional,
  // decorators here
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateArticoliCostiCfCommDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  costo2?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  costo1?: string | null;

  // @ApiProperty({
  //   required: true,
  //   type: () => String,
  // })
  // @IsString()
  // CF_COMM_ID: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
