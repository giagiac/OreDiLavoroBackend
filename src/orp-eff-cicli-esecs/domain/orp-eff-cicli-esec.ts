import { ApiProperty } from '@nestjs/swagger';
import { EpsNestjsOrpEffCicliEsec } from '../../eps-nestjs-orp-eff-cicli-esecs/domain/eps-nestjs-orp-eff-cicli-esec';
import { OrpEffCicli } from '../../orp-eff-ciclis/domain/orp-eff-cicli';

export class OrpEffCicliEsec {
  @ApiProperty({
    type: () => Array<OrpEffCicli>,
    nullable: true,
  })
  orpEffCicli?: Array<OrpEffCicli> | null;

  @ApiProperty({
    type: () => EpsNestjsOrpEffCicliEsec,
    nullable: true,
  })
  epsNestjsOrpEffCicliEsec?: EpsNestjsOrpEffCicliEsec | null;

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
    type: () => Number,
    nullable: true,
  })
  TEMPO_OPERATORE?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  DOC_RIGA_ESEC_ID: string;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  NUM_ESEC?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  DOC_RIGA_ID?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  NUM_RIGA?: string | null;

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
    type: () => String,
  })
  CODICE_BREVE: string;
}
