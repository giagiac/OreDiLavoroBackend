import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';
import Decimal from 'decimal.js';
import { TipoTrasferta } from '../../eps-nestjs-orp-eff-cicli-esecs/domain/eps-nestjs-orp-eff-cicli-esec';
import {
  // decorators here
  Transform,
} from 'class-transformer';

export class CreateEpsNestjsOrpEffCicliEsecChildDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  ERROR_SYNC?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  APP_REQ3_HYPSERV_COD_CHIAVE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  HYPSERV_REQ2_COD_CHIAVE?: string | null;

  @ApiProperty({
    required: false,
    type: () => Decimal,
  })
  @IsOptional()
  @IsNumber()
  KM?: Decimal | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  TIPO_TRASFERTA: TipoTrasferta;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  NUM_RIGA?: number | null;

  @ApiProperty({
    required: false,
    type: () => Decimal,
  })
  @IsOptional()
  @IsNumber()
  TEMPO_MINUTI_OP?: Decimal | null;

  @ApiProperty({
    required: false,
    type: () => Decimal,
  })
  @IsOptional()
  @IsNumber()
  TEMPO_MINUTI_MACC?: Decimal | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  NOTE?: string | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  DATA_FINE?: Date | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  DATA_INIZIO?: Date | null;

  @ApiProperty({
    required: false,
    type: () => Decimal,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const timeParts = value.split(':');
      if (timeParts.length === 2) {
        const hours = new Decimal(timeParts[0]);
        const minutes = new Decimal(timeParts[1]).dividedBy(60);
        return hours.plus(minutes);
      }
      throw new Error('Invalid time format. Expected hh:mm');
    }
    return value;
  })
  TEMPO_OPERATORE?: Decimal | null;

  @ApiProperty({
    required: false,
    type: () => Decimal,
  })
  @IsOptional()
  @IsNumber()
  TEMPO_MACCHINA?: Decimal | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })ì
  @IsString()
  COD_OP: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  COD_ART?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsString()
  @IsOptional()
  DOC_RIGA_ESEC_ID?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  DOC_RIGA_ID?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  DOC_ID?: string | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  AZIENDA_ID?: number | null;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  idfk: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
