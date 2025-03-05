import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CfCommEntity } from '../../../../../cf-comms/infrastructure/persistence/relational/entities/cf-comm.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

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

  @OneToMany(() => CfCommEntity, (cf) => cf.cf)
  cfComm?: CfCommEntity[] | null;
}
