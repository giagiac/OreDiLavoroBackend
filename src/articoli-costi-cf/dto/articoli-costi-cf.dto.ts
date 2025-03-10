import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ArticoliCostiCfDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
