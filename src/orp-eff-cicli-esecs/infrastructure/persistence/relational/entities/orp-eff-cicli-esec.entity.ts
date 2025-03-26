import { OrpEffCicliEntity } from '../../../../../orp-eff-ciclis/infrastructure/persistence/relational/entities/orp-eff-cicli.entity';

import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'ORP_EFF_CICLI_ESEC',
})
export class OrpEffCicliEsecEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Date,
  })
  DATA_FINE?: Date | null;

  @Column({
    nullable: true,
    type: Date,
  })
  DATA_INIZIO?: Date | null;

  @Column({
    nullable: true,
    type: Number,
  })
  TEMPO_OPERATORE?: number | null;

  @PrimaryColumn({
    nullable: false,
    type: String,
  })
  DOC_RIGA_ESEC_ID: string;

  @Column({
    nullable: true,
    type: Number,
  })
  NUM_ESEC?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  DOC_RIGA_ID?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  NUM_RIGA?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  DOC_ID?: string | null;

  @Column({
    nullable: true,
    type: Number,
  })
  AZIENDA_ID?: number | null;

  CODICE_BREVE: string;

  @OneToMany(
    () => OrpEffCicliEntity,
    (orpEffCicliEntity) => orpEffCicliEntity.orpEffCicliEsec,
    {
      eager: true,
    },
  )
  orpEffCicli?: OrpEffCicliEntity[] | null;

  @OneToOne(
    () => EpsNestjsOrpEffCicliEsecEntity,
    (epsNestjsOrpEffCicliEsec) => epsNestjsOrpEffCicliEsec.orpEffCicliEsec,
  )
  @JoinColumn({
    name: 'DOC_RIGA_ESEC_ID',
    referencedColumnName: 'DOC_RIGA_ESEC_ID',
  })
  epsNestjsOrpEffCicliEsec?: EpsNestjsOrpEffCicliEsecEntity | null;
}
