import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ArtAnaEntity } from '../../../../../art-ana/infrastructure/persistence/relational/entities/art-ana.entity';

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

  @OneToOne(() => ArtAnaEntity, (artAna) => artAna.epsNestjsTargaMezzi)
  @JoinColumn({
    name: 'COD_ART',
    referencedColumnName: 'COD_ART',
  })
  artAna?: ArtAnaEntity | null;
}
