import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class artCostiDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
