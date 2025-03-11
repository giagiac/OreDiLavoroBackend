import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TipoCosto } from '../../../../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'EPS_NESTJS_ARTICOLI_COSTI_CF_COMM',
})
export class ArticoliCostiCfCommEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  TIPO_COSTO?: TipoCosto | null;

  @Column({
    nullable: true,
    type: String,
  })
  COD_ART?: string | null;

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

  // @OneToOne(() => CfCommEntity, (cfComm) => cfComm.CF_COMM_ID)
  // @JoinColumn({
  //   referencedColumnName: 'CF_COMM_ID',
  //   name: 'CF_COMM_ID',
  // })
  // CfComm?: CfCommEntity | null;
}
