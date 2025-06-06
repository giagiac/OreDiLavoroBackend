import Decimal from 'decimal.js';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OperatoriEntity } from '../../../../../operatoris/infrastructure/persistence/relational/entities/operatori.entity';
import { OrpEffCicliEsecEntity } from '../../../../../orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/orp-eff-cicli-esec.entity';
import { OrpEffCicliEntity } from '../../../../../orp-eff-ciclis/infrastructure/persistence/relational/entities/orp-eff-cicli.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

import { ValueTransformer } from 'typeorm';
import { AppReq3HypServEntity } from '../../../../../app-req3-hyp-servs/infrastructure/persistence/relational/entities/app-req3-hyp-serv.entity';
import { EpsNestjsOrpEffCicliEsecChildEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esec-children/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec-child.entity';
import { HypServReq2Entity } from '../../../../../hyp-serv-req2/infrastructure/persistence/relational/entities/hyp-serv-req2.entity';
import { TipoTrasferta } from '../../../../domain/eps-nestjs-orp-eff-cicli-esec';
import { ArtAnaEntity } from '../../../../../art-ana/infrastructure/persistence/relational/entities/art-ana.entity';

export class DecimalToNumberTransformer implements ValueTransformer {
  // Trasforma il valore da salvare nel database (numero -> stringa)
  to(value: Decimal | null): number | null {
    return value !== null && value !== undefined ? value.toNumber() : null;
  }

  // Trasforma il valore recuperato dal database (stringa -> numero)
  from(value: number | null): Decimal | null {
    return value !== null && value !== undefined ? new Decimal(value.toString()) : null;
  }
}

@Entity({
  name: 'EPS_NESTJS_ORP_EFF_CICLI_ESEC',
})
export class EpsNestjsOrpEffCicliEsecEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  ERROR_SYNC?: string | null;

  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    nullable: true,
    type: String,
  })
  APP_REQ3_HYPSERV_COD_CHIAVE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  HYPSERV_REQ2_COD_CHIAVE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  KM?: Decimal | null;

  @Column({
    nullable: false,
    type: String,
  })
  TIPO_TRASFERTA: TipoTrasferta;

  @Column({
    nullable: true,
    type: String,
    // transformer: new NumberToStringTransformer(),
  })
  TEMPO_MINUTI_OP?: Decimal | null;

  @Column({
    nullable: true,
    type: String,
    // transformer: new NumberToStringTransformer(),
  })
  TEMPO_MINUTI_MACC?: Decimal | null;

  @Column({
    nullable: true,
    type: String,
  })
  NOTE?: string | null;

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
    type: String, // ATT.NE importante che sia stringa
    // transformer: new DecimalToNumberTransformer(),
  })
  TEMPO_OPERATORE?: string | null;

  @Column({
    nullable: true,
    type: String, // ATT.NE importante che sia stringa
    // transformer: new DecimalToNumberTransformer(),
  })
  TEMPO_MACCHINA?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  COD_OP?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  COD_ART?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  DOC_RIGA_ESEC_ID?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  DOC_RIGA_ID?: string | null;

  @Column({
    nullable: true,
    type: Number,
  })
  NUM_RIGA?: number | null;

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

  // tabella di HG dopo aver passato i dati al servizio - servirà per lo STORICO
  @OneToOne(() => OrpEffCicliEsecEntity, (orpEffCicliEsec) => orpEffCicliEsec.epsNestjsOrpEffCicliEsec)
  @JoinColumn({
    name: 'DOC_RIGA_ESEC_ID',
    referencedColumnName: 'DOC_RIGA_ESEC_ID',
  })
  orpEffCicliEsec?: OrpEffCicliEsecEntity | null;

  // tabella di HG - dati dei cicli DOC_RIGA_ID - l'utente cerca per codice COMMESSA :
  // il codice COMMESSA BREVE, l'ultimo carattere è in numero del ciclo
  @ManyToOne(() => OrpEffCicliEntity, (orpEffCicliEntity) => orpEffCicliEntity.epsNestjsOrpEffCicliEsec)
  @JoinColumn({
    name: 'DOC_RIGA_ID',
    referencedColumnName: 'DOC_RIGA_ID',
  })
  orpEffCicli?: OrpEffCicliEntity | null;

  // riferimento a operatore (il filtro sarà stretto solo sull'operatore corrente)
  //
  @ManyToOne(() => OperatoriEntity, (operatoriEntity) => operatoriEntity.epsNestjsOrpEffCicliEsec)
  @JoinColumn({
    name: 'COD_OP',
    referencedColumnName: 'COD_OP',
  })
  operatori?: OperatoriEntity | null;

  // tabella di HG dopo aver passato i dati al servizio - servirà per lo STORICO
  @OneToOne(() => HypServReq2Entity, (hypServReq2) => hypServReq2.epsNestjsOrpEffCicliEsec)
  @JoinColumn({
    name: 'HYPSERV_REQ2_COD_CHIAVE',
    referencedColumnName: 'COD_CHIAVE',
  })
  hypServReq2?: HypServReq2Entity | null;

  // tabella di HG dopo aver passato i dati al servizio - servirà per lo STORICO
  @OneToOne(() => AppReq3HypServEntity, (appReq3HypServ) => appReq3HypServ.epsNestjsOrpEffCicliEsec)
  @JoinColumn({
    name: 'APP_REQ3_HYPSERV_COD_CHIAVE',
    referencedColumnName: 'COD_CHIAVE',
  })
  appReq3HypServ?: AppReq3HypServEntity | null;

  // Articoli
  @OneToOne(() => ArtAnaEntity, (artAna) => artAna.epsNestjsOrpEffCicliEsec)
  @JoinColumn({
    name: 'COD_ART',
    referencedColumnName: 'COD_ART',
  })
  artAna?: ArtAnaEntity | null;

  // tabella figlia
  epsNestjsOrpEffCicliEsecChild?: EpsNestjsOrpEffCicliEsecChildEntity[] | null;
}
