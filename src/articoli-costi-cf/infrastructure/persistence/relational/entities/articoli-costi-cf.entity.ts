import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArtAnaEntity } from '../../../../../art-ana/infrastructure/persistence/relational/entities/art-ana.entity';
import { CfEntity } from '../../../../../cfs/infrastructure/persistence/relational/entities/cf.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

export type TipoTrasferta =
  | 'in_giornata'
  | 'in_giornata_dopo_21'
  | 'fuori_sede_andata'
  | 'fuori_sede_ritorno';

@Entity({
  name: 'EPS_NESTJS_ARTICOLI_COSTI_CF',
})
export class ArticoliCostiCfEntity extends EntityRelationalHelper {
  @Column({
    type: String,
  })
  TIPO_TRASFERTA?: TipoTrasferta;

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
