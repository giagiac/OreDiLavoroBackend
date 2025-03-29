import Decimal from 'decimal.js';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ArtAnaEntity } from '../../../../../art-ana/infrastructure/persistence/relational/entities/art-ana.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

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
    type: String,
    // transformer: new NumberToStringTransformer(),
  })
  COSTO_ART: Decimal;

  @Column()
  DATA_RIF: Date;

  @ManyToOne(() => ArtAnaEntity)
  @JoinColumn({
    referencedColumnName: 'COD_ART',
    name: 'COD_ART',
  })
  artAna: ArtAnaEntity | null;
}
