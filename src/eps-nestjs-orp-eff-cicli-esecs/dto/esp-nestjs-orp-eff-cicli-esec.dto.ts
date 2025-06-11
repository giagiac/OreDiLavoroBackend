import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EpsNestjsOrpEffCicliEsecDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  COD_OP: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  DATA_INIZIO;

  @ApiProperty()
  @IsString()
  @IsOptional()
  DATA_FINE;
}

export class JoinDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  join?: string | null;
}
