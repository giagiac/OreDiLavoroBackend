import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrpEffCicliEsecDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  DOC_RIGA_ESEC_ID: string;
}
