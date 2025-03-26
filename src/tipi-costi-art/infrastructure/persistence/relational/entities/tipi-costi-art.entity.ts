import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'TIPI_COSTI_ART',
})
export class tipiCostiArtEntity extends EntityRelationalHelper {
  @PrimaryColumn()
  COD_TIPO_COST: string;

  @Column()
  DES_TIPO_COST: string;

  @Column()
  TIPO_COSTO: number;
}
