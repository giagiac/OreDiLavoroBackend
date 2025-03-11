import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ArticoliCostiCfEntity } from '../../../../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';
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

  @Column()
  COSTO_ART: Number;

  @Column()
  DATA_RIF: Date;

  @ManyToOne(() => ArticoliCostiCfEntity)
  @JoinColumn({
    referencedColumnName: 'COD_ART',
    name: 'COD_ART',
  })
  articoliCostiCf: ArticoliCostiCfEntity | null;
}
