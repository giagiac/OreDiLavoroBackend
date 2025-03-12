import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'ART_ANA',
})
export class ArtAnaEntity extends EntityRelationalHelper {
  @PrimaryColumn()
  COD_ART: string;

  @Column()
  DES_ART: string;

  @Column()
  COD_CAT: string;
}
