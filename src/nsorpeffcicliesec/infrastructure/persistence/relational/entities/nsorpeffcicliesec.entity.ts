import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'NsOrpEffCicliEsec',
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

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
