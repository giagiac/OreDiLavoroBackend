import { ApiProperty } from '@nestjs/swagger';
import Decimal from 'decimal.js';
import { OrpEffCicli } from '../../orp-eff-ciclis/domain/orp-eff-cicli';

export class EpsNestjsOrpEffCicliEsec {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  TIPO_TRASFERTA: string;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  TOTALE_TEMPO_MINUTI_OP?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  NUM_RIGA?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  APP_REQ3_SYNCED?: number | null;

  @ApiProperty({
    type: () => Decimal,
    nullable: true,
  })
  TEMPO_MINUTI_OP?: Decimal | null;

  @ApiProperty({
    type: () => Decimal,
    nullable: true,
  })
  TEMPO_MINUTI_MACC?: Decimal | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  NOTE?: string | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  DATA_FINE?: Date | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  DATA_INIZIO?: Date | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  TEMPO_OPERATORE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  TEMPO_OPERATORE_SESSANTESIMI?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  TEMPO_MACCHINA?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_OP?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_ART?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  DOC_RIGA_ESEC_ID?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  DOC_RIGA_ID?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  DOC_ID?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  AZIENDA_ID?: number | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  // -------------------------
  @ApiProperty({
    type: () => OrpEffCicli,
    nullable: true,
  })
  orpEffCicli?: OrpEffCicli | null;
}
