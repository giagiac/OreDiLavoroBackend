import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';
import { LinkOrpOrdEntity } from '../../../../../link-orp-ords/infrastructure/persistence/relational/entities/link-orp-ord.entity';
import { OrpEffCicliEsecEntity } from '../../../../../orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/orp-eff-cicli-esec.entity';
import { OrpEffEntity } from '../../../../../orp-effs/infrastructure/persistence/relational/entities/orp-eff.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { EpsNestjsOrpEffCicliEsecChildEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esec-children/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec-child.entity';

@Entity({
  name: 'ORP_EFF_CICLI',
})
export class OrpEffCicliEntity extends EntityRelationalHelper {
  CODICE_BREVE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  DES_LAV?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  DES_CICLO?: string | null;

  @PrimaryColumn({
    nullable: false,
    type: String,
  })
  DOC_RIGA_ID: string;

  @Column({
    nullable: false,
    type: Number,
  })
  NUM_RIGA: number;

  @Column({
    nullable: false,
    type: String,
    name: 'DOC_ID',
  })
  DOC_ID: string;

  @Column({
    nullable: true,
    type: Number,
  })
  AZIENDA_ID?: number | null;

  @OneToMany(() => LinkOrpOrdEntity, (linkOrpOrd) => linkOrpOrd.orpEffCicli)
  @JoinColumn({
    name: 'DOC_ID',
    referencedColumnName: 'ORP_EFF_DOC_ID',
  })
  linkOrpOrd?: Array<LinkOrpOrdEntity> | null;

  // -----------------------------------------------------------------------------

  @ManyToOne(() => OrpEffCicliEsecEntity)
  @JoinColumn({
    referencedColumnName: 'DOC_RIGA_ID',
    name: 'DOC_RIGA_ID',
  })
  orpEffCicliEsec?: OrpEffCicliEsecEntity | null;

  @OneToOne(() => OrpEffEntity, (orpEff) => orpEff.orpEffCicli)
  @JoinColumn({
    name: 'DOC_ID',
    referencedColumnName: 'DOC_ID',
  })
  orpEff?: OrpEffEntity | null;

  // tabella di HG - dati dei cicli DOC_RIGA_ID - l'utente cerca per codice COMMESSA :
  // il codice COMMESSA BREVE, l'ultimo carattere è in numero del ciclo
  // riferimento inverso a eps-nestjs-orp-eff-cicli-esec
  @OneToMany(() => EpsNestjsOrpEffCicliEsecEntity, (epsNestjsOrpEffCicliEsec) => epsNestjsOrpEffCicliEsec.orpEffCicli)
  @JoinColumn({
    name: 'DOC_RIGA_ID',
    referencedColumnName: 'DOC_RIGA_ID',
  })
  epsNestjsOrpEffCicliEsec?: EpsNestjsOrpEffCicliEsecEntity | null;

  // tabella di HG - dati dei cicli DOC_RIGA_ID - l'utente cerca per codice COMMESSA :
  // il codice COMMESSA BREVE, l'ultimo carattere è in numero del ciclo
  // riferimento inverso a eps-nestjs-orp-eff-cicli-esec
  @OneToMany(() => EpsNestjsOrpEffCicliEsecChildEntity, (epsNestjsOrpEffCicliEsecChild) => epsNestjsOrpEffCicliEsecChild.orpEffCicli)
  @JoinColumn({
    name: 'DOC_RIGA_ID',
    referencedColumnName: 'DOC_RIGA_ID',
  })
  epsNestjsOrpEffCicliEsecChild?: EpsNestjsOrpEffCicliEsecChildEntity | null;
}
