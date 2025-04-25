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
import { TipoTrasferta } from '../../../../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';
import { CfCommEntity } from '../../../../../cf-comms/infrastructure/persistence/relational/entities/cf-comm.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'EPS_NESTJS_ARTICOLI_COSTI_CF_COMM',
})
export class ArticoliCostiCfCommEntity extends EntityRelationalHelper {
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
  CF_COMM_ID: string;

  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // -----------------------------------------------------------------------------

  @ManyToOne(() => CfCommEntity)
  @JoinColumn({
    referencedColumnName: 'CF_COMM_ID',
    name: 'CF_COMM_ID',
  })
  cfComm: CfCommEntity | null;

  @OneToOne(() => ArtAnaEntity, (artAna) => artAna.COD_ART)
  @JoinColumn({
    referencedColumnName: 'COD_ART',
    name: 'COD_ART',
  })
  artAna?: ArtAnaEntity | null;
}
