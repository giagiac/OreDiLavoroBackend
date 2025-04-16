import Decimal from 'decimal.js';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OperatoriEntity } from '../../../../../operatoris/infrastructure/persistence/relational/entities/operatori.entity';
import { OrpEffCicliEsecEntity } from '../../../../../orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/orp-eff-cicli-esec.entity';
import { OrpEffCicliEntity } from '../../../../../orp-eff-ciclis/infrastructure/persistence/relational/entities/orp-eff-cicli.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

import { ValueTransformer } from 'typeorm';
import { TipoTrasferta } from '../../../../domain/eps-nestjs-orp-eff-cicli-esec';

export class DecimalToNumberTransformer implements ValueTransformer {
  // Trasforma il valore da salvare nel database (numero -> stringa)
  to(value: Decimal | null): number | null {
    return value !== null && value !== undefined ? value.toNumber() : null;
  }

  // Trasforma il valore recuperato dal database (stringa -> numero)
  from(value: number | null): Decimal | null {
    return value !== null && value !== undefined
      ? new Decimal(value.toString())
      : null;
  }
}

@Entity({
  name: 'EPS_NESTJS_ORP_EFF_CICLI_ESEC',
})
export class EpsNestjsOrpEffCicliEsecEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  KM?: number | null;

  @Column({
    nullable: false,
    type: String,
  })
  TIPO_TRASFERTA: TipoTrasferta;

  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    nullable: true,
    type: Number,
  })
  SYNCED?: number | null;

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
  @OneToOne(
    () => OrpEffCicliEsecEntity,
    (orpEffCicliEsec) => orpEffCicliEsec.epsNestjsOrpEffCicliEsec,
  )
  @JoinColumn({
    name: 'DOC_RIGA_ESEC_ID',
    referencedColumnName: 'DOC_RIGA_ESEC_ID',
  })
  orpEffCicliEsec?: OrpEffCicliEsecEntity | null;

  // tabella di HG - dati dei cicli DOC_RIGA_ID - l'utente cerca per codice COMMESSA :
  // il codice COMMESSA BREVE, l'ultimo carattere è in numero del ciclo
  @ManyToOne(
    () => OrpEffCicliEntity,
    (orpEffCicliEntity) => orpEffCicliEntity.epsNestjsOrpEffCicliEsec,
  )
  @JoinColumn({
    name: 'DOC_RIGA_ID',
    referencedColumnName: 'DOC_RIGA_ID',
  })
  orpEffCicli?: OrpEffCicliEntity | null;

  // riferimento a operatore (il filtro sarà stretto solo sull'operatore corrente)
  //
  @ManyToOne(
    () => OperatoriEntity,
    (operatoriEntity) => operatoriEntity.epsNestjsOrpEffCicliEsec,
  )
  @JoinColumn({
    name: 'COD_OP',
    referencedColumnName: 'COD_OP',
  })
  operatori?: OperatoriEntity | null;
}
