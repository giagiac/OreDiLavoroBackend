import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrpEffCicliDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  DOC_RIGA_ID: string;
}
