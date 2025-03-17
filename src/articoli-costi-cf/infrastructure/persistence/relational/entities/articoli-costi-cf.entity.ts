import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ArtAnaEntity } from '../../../../../art-ana/infrastructure/persistence/relational/entities/art-ana.entity';
import { CfEntity } from '../../../../../cf/infrastructure/persistence/relational/entities/cf.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

export type TipoCosto =
  | 'IN_GIORNATA'
  | 'IN_GIORNATA_DOPO_21'
  | 'PERNOTTO_FUORISEDE_ANDATA'
  | 'PERNOTTO_FUORISEDE_RITORNO';

@Entity({
  name: 'EPS_NESTJS_ARTICOLI_COSTI_CF',
})
export class ArticoliCostiCfEntity extends EntityRelationalHelper {
  @Column({
    type: String,
  })
  TIPO_COSTO?: TipoCosto;

  @Column({
    nullable: true,
    type: String,
  })
  COD_ART?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  COD_CF: string;

  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  // -----------------------------------------------------------------------------

  @ManyToOne(() => CfEntity)
  @JoinColumn({
    referencedColumnName: 'COD_CF',
    name: 'COD_CF',
  })
  cf: CfEntity | null;

  @OneToOne(() => ArtAnaEntity, (artAna) => artAna.COD_ART)
  @JoinColumn({
    referencedColumnName: 'COD_ART',
    name: 'COD_ART',
  })
  artAna?: ArtAnaEntity | null;

}
