import { ApiProperty } from '@nestjs/swagger';
import { TipoTrasferta } from '../../eps-nestjs-orp-eff-cicli-esecs/domain/eps-nestjs-orp-eff-cicli-esec';
import Decimal from 'decimal.js';
import { AppReq3HypServ } from '../../app-req3-hyp-servs/domain/app-req3-hyp-serv';
import { HypServReq2 } from '../../hyp-serv-req2/domain/hyp-serv-req2';
import { OrpEffCicli } from '../../orp-eff-ciclis/domain/orp-eff-cicli';
import { ArtAna } from '../../art-ana/domain/art-ana';

export class EpsNestjsOrpEffCicliEsecChild {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  ERROR_SYNC?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  APP_REQ3_HYPSERV_COD_CHIAVE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  HYPSERV_REQ2_COD_CHIAVE?: string | null;

  @ApiProperty({
    type: () => Decimal,
    nullable: true,
  })
  KM?: Decimal | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  TIPO_TRASFERTA: TipoTrasferta;

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

  @ApiProperty({
    type: Number,
  })
  idfk: number;

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

  @ApiProperty({
    type: () => HypServReq2,
    nullable: true,
  })
  hypServReq2?: HypServReq2 | null;

  @ApiProperty({
    type: () => AppReq3HypServ,
    nullable: true,
  })
  appReq3HypServ?: AppReq3HypServ | null;

  @ApiProperty({
    type: () => ArtAna,
    nullable: true,
  })
  artAna?: ArtAna | null;
}
