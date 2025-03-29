import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { CfCommEntity } from '../../../../../cf-comm/infrastructure/persistence/relational/entities/cf-comm.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ArticoliCostiCfEntity } from '../../../../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';
import { OrdCliRigheEntity } from '../../../../../ord-cli-righes/infrastructure/persistence/relational/entities/ord-cli-righe.entity';

@Entity({
  name: 'CF',
})
export class CfEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  COD_FISC_CF?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  P_IVA_CF?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  RAG_SOC_CF_INT?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  RAG_SOC_CF?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  @PrimaryColumn()
  COD_CF: string;

  @OneToMany(() => CfCommEntity, (cfComm) => cfComm.cf, { eager: true })
  cfComm?: CfCommEntity[] | null;

  @OneToMany(() => ArticoliCostiCfEntity, (articoliCosti) => articoliCosti.cf, {
    eager: true,
  })
  articoliCostiCf?: ArticoliCostiCfEntity[] | null;

  @OneToOne(() => OrdCliRigheEntity, (ordCliRighe) => ordCliRighe.cf)
  @JoinColumn({
    name: 'COD_CF',
    referencedColumnName: 'COD_CF',
  })
  ordCliRighe?: CfEntity | null;
}
