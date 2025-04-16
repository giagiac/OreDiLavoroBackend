import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'EPS_NESTJS_DESTINAZIONI',
})
export class EpsNestjsDestinazioniEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  RESPONSE: string;

  @Column({
    nullable: false,
    type: Number,
  })
  VALUE: number;

  @Column({
    nullable: false,
    type: String,
  })
  KM: string;

  @Column({
    nullable: false,
    type: String,
  })
  LINK: string;

  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
