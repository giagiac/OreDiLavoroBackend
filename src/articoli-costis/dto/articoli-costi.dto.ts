import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ArticoliCostiDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
