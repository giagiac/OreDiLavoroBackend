import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import Decimal from 'decimal.js';
import { TipoTrasferta } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/domain/eps-nestjs-orp-eff-cicli-esec';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';

@Entity({
  name: 'EPS_NESTJS_ORP_EFF_CICLI_ESEC_CHILD',
})
export class EpsNestjsOrpEffCicliEsecChildEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  ERROR_SYNC?: string | null;

  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: Number,
  })
  idfk: number;

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
    type: Number,
  })
  KM?: number | null;

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

  @ManyToOne(() => EpsNestjsOrpEffCicliEsecEntity, (epsNestjsOrpEffCicliEsec) => epsNestjsOrpEffCicliEsec.epsNestjsOrpEffCicliEsecChild)
  @JoinColumn({
    name: 'idfk',
    referencedColumnName: 'id',
  })
  epsNestjsOrpEffCicliEsec: EpsNestjsOrpEffCicliEsecEntity;
}
