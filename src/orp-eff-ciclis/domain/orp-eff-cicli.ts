import { ApiProperty } from '@nestjs/swagger';
import { LinkOrpOrd } from '../../link-orp-ords/domain/link-orp-ord';
import { OrpEff } from '../../orp-effs/domain/orp-eff';
import { OrpEffCicliEsecEntity } from '../../orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/orp-eff-cicli-esec.entity';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';

export class OrpEffCicli {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  CODICE_BREVE?: string | null; // parametro aggiunto solo per ricercare (non presente in db)

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  DES_LAV?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  DES_CICLO?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  DOC_RIGA_ID: string;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  NUM_RIGA: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  DOC_ID: string;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  AZIENDA_ID?: number | null;

  @ApiProperty({
    type: () => Array<LinkOrpOrd>,
    nullable: true,
  })
  linkOrpOrd?: Array<LinkOrpOrd> | null;

  @ApiProperty({
    type: () => OrpEff,
    nullable: true,
  })
  orpEff?: OrpEff | null;

  @ApiProperty({
    type: () => OrpEffCicliEsecEntity,
    nullable: true,
  })
  orpEffCicliEsec?: OrpEffCicliEsecEntity | null;

  @ApiProperty({
    type: () => EpsNestjsOrpEffCicliEsecEntity,
    nullable: true,
  })
  epsNestjsOrpEffCicliEsec?: EpsNestjsOrpEffCicliEsecEntity | null;
}
