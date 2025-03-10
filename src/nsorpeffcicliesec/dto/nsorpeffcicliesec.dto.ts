import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class nsorpeffcicliesecDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
