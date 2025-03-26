import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { OrpEffEntity } from '../../../../../orp-effs/infrastructure/persistence/relational/entities/orp-eff.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'X1_TRAS_CODICI',
})
export class X1TrasCodiciEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  CODICE2?: string | null;

  @PrimaryColumn({
    nullable: false,
    type: String,
  })
  CODICE1: string;

  @OneToOne(() => OrpEffEntity, (orpEff) => orpEff.x1TrasCodici)
  @JoinColumn({
    name: 'CODICE1',
    referencedColumnName: 'SERIE_DOC',
  })
  orpEff?: OrpEffEntity | null;
}
