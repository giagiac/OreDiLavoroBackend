import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ArticoliCostiCfCommEntity } from '../../../../../articoli-costi-cf-comm/infrastructure/persistence/relational/entities/articoli-costi-cf-comm.entity';
import { CfEntity } from '../../../../../cfs/infrastructure/persistence/relational/entities/cf.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'CF_COMM',
})
export class CfCommEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  NOTE_SEDE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  RIFERIMENTO_SEDE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  E_MAIL_SEDE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  FAX_SEDE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  TEL_SEDE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  PROVINCIA_SEDE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  COMUNE_SEDE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  CAP_SEDE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  INDI_SEDE?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  @PrimaryColumn()
  CF_COMM_ID: string;

  @Column({
    nullable: false,
    type: String,
  })
  COD_CF: string;

  @Column({
    nullable: true,
    type: String,
  })
  DES_SEDE?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  NUM_SEDE: string;

  @Column({
    nullable: true,
    type: Number,
  })
  X_CIVICO_NUMERO?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  X_FRAZIONE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  X_ZONA?: string | null;

  @ManyToOne(() => CfEntity)
  @JoinColumn({
    referencedColumnName: 'COD_CF',
    name: 'COD_CF',
  })
  cf: CfEntity | null;

  @OneToMany(
    () => ArticoliCostiCfCommEntity,
    (articoliCostiCfComm) => articoliCostiCfComm.cfComm,
    { eager: true },
  )
  @JoinColumn({
    referencedColumnName: 'CF_COMM_ID',
  })
  articoliCostiCfComm?: Array<ArticoliCostiCfCommEntity> | null;
}
