import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EpsNestjsDestinazioniDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
