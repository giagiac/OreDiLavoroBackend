import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LinkOrpOrdDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
