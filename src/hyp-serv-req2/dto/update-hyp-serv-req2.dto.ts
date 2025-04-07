// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHypServReq2Dto } from './create-hyp-serv-req2.dto';
import { IsOptional, IsNumber, IsString, IsDate } from 'class-validator';

export class UpdateHypServReq2Dto extends PartialType(
  CreateHypServReq2Dto,
) {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  NUM_AZIENDA?: number | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  COD_REQ3_HYPSERV: string;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  PROGR?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  UTENTE_FROM?: string | null;

  @IsOptional()
  @IsDate()
  DATAORA_RICHIESTA?: Date;

  @IsOptional()
  @IsString()
  CHIAVE_ESTERNA?: string;

  @IsOptional()
  @IsString()
  CAMPO_PARAMETRI?: string;

  @IsOptional()
  @IsNumber()
  FLAG_STATUS?: number;

  @IsOptional()
  @IsDate()
  DATAORA_INIZIO_ELAB?: Date;

  @IsOptional()
  @IsString()
  UTENTE_ELAB?: string;

  @IsOptional()
  @IsDate()
  DATAORA_FINE_ELAB?: Date;

  @IsOptional()
  @IsNumber()
  FLAG_ESITO_ELAB?: number;

  @IsOptional()
  @IsString()
  STRINGA_ESITO_ELAB?: string;
}
