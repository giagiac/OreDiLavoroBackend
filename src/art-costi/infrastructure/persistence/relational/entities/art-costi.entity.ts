import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { ArtAnaEntity } from '../../../../../art-ana/infrastructure/persistence/relational/entities/art-ana.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { NumberToStringTransformer } from '../../../../../utils/transformers/number.transformer';

@Entity({
  name: 'ART_COSTI',
})
export class ArtCostiEntity extends EntityRelationalHelper {
  @PrimaryColumn()
  COD_ART_TIPO_COST: string;

  @Column()
  COD_ART: string;

  @Column()
  COD_TIPO_COST: string;

  @Column({
    type: 'number',
    transformer: new NumberToStringTransformer(),
  })
  COSTO_ART: string;

  @Column()
  DATA_RIF: Date;

  @ManyToOne(() => ArtAnaEntity)
  @JoinColumn({
    referencedColumnName: 'COD_ART',
    name: 'COD_ART',
  })
  artAna: ArtAnaEntity | null;
}
