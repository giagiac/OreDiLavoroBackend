import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'EPS_NESTJS_ORP_EFF_CICLI_ESEC',
})
export class nsorpeffcicliesecEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  DOC_RIGA_ID: string;

  @Column({
    nullable: false,
    type: Number,
  })
  NUM_RIGA: number;

  @Column({
    nullable: false,
    type: String,
  })
  DOC_ID: string;

  @Column({
    nullable: false,
    type: Number,
  })
  AZIENDA_ID: number;

  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
