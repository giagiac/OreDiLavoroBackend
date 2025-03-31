import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'EPS_NESTJS_TARGA_MEZZI',
})
export class EpsNestjsTargaMezziEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  COD_ART: string;

  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
