import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';

@Entity({
  name: 'HYPSERV_REQ2',
})
export class HypServReq2Entity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  COD_CHIAVE: string;

  @Column({
    nullable: true,
    type: Number,
  })
  NUM_AZIENDA?: number | null;

  @Column({
    nullable: false,
    type: String,
  })
  COD_REQ2_HYPSERV: string;

  @Column({
    nullable: true,
    type: Number,
  })
  PROGR?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  UTENTE_FROM?: string | null;

  // Nuove proprietà
  @Column({
    nullable: true,
    type: 'timestamp',
  })
  DATAORA_RICHIESTA?: Date;

  @Column({
    nullable: true,
    type: String,
  })
  CAMPO_PARAMETRI?: string;

  @Column({
    nullable: true,
    type: Number,
  })
  FLAG_STATUS?: number;

  @Column({
    nullable: true,
    type: 'timestamp',
  })
  DATAORA_INIZIO_ELAB?: Date;

  @Column({
    nullable: true,
    type: String,
  })
  UTENTE_ELAB?: string;

  @Column({
    nullable: true,
    type: 'timestamp',
  })
  DATAORA_FINE_ELAB?: Date;

  @Column({
    nullable: true,
    type: Number,
  })
  FLAG_ESITO_ELAB?: number;

  @Column({
    nullable: true,
    type: String,
  })
  STRINGA_ESITO_ELAB?: string;

  // tabella di HG - dati dei cicli DOC_RIGA_ID - l'utente cerca per codice COMMESSA :
  // il codice COMMESSA BREVE, l'ultimo carattere è in numero del ciclo
  // riferimento inverso a eps-nestjs-orp-eff-cicli-esec
  @OneToOne(() => EpsNestjsOrpEffCicliEsecEntity, (epsNestjsOrpEffCicliEsec) => epsNestjsOrpEffCicliEsec.hypServReq2)
  @JoinColumn({
    name: 'COD_CHIAVE',
    referencedColumnName: 'HYPSERV_REQ2_COD_CHIAVE',
  })
  epsNestjsOrpEffCicliEsec?: EpsNestjsOrpEffCicliEsecEntity | null;
}
