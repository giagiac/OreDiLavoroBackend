import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { CfCommEntity } from '../../../../../cf-comms/infrastructure/persistence/relational/entities/cf-comm.entity';

@Entity({
  name: 'EPS_NESTJS_ARTICOLI_COSTI',
})
export class ArticoliCostiEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  costo2?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  costo1?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  CF_COMM_ID: string;

  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => CfCommEntity, (cfComm) => cfComm.CF_COMM_ID)
  @JoinColumn({
    referencedColumnName: 'CF_COMM_ID',
    name: 'CF_COMM_ID',
  })
  CfComm?: CfCommEntity | null;
}
