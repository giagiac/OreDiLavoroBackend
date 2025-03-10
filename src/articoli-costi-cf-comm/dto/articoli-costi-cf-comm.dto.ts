import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ArticoliCostiCfCommDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
