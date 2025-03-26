import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class X1TrasCodiciDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
