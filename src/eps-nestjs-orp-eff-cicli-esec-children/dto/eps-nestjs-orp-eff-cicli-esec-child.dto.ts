import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EpsNestjsOrpEffCicliEsecChildDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
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
