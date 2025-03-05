import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ArticoliCostiEntity } from '../../../../../articoli-costis/infrastructure/persistence/relational/entities/articoli-costi.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { CfEntity } from '../../../../../cfs/infrastructure/persistence/relational/entities/cf.entity';

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

  @ManyToOne(() => CfEntity)
  @JoinColumn({
    referencedColumnName: 'COD_CF',
    name: "COD_CF"
  })
  cf:CfEntity | null

  @OneToOne(
    () => ArticoliCostiEntity,
    (articoliCosti) => articoliCosti.CfComm,
    { eager: true },
  )
  articoliCosti: ArticoliCostiEntity | null;
}
