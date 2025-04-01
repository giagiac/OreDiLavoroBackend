import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { OrpEffCicliEntity } from '../../../../../orp-eff-ciclis/infrastructure/persistence/relational/entities/orp-eff-cicli.entity';
import { X1TrasCodiciEntity } from '../../../../../x1-tras-codicis/infrastructure/persistence/relational/entities/x1-tras-codici.entity';

@Entity({
  name: 'ORP_EFF',
})
export class OrpEffEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: Date,
  })
  DATA_DOC: Date;

  @Column({
    nullable: false,
    type: String,
  })
  SERIE_DOC: string;

  @Column({
    nullable: false,
    type: Number,
  })
  NUM_DOC: number;

  @Column({
    nullable: false,
    type: String,
  })
  ANNO_DOC: string;

  @PrimaryColumn({
    nullable: false,
    type: String,
  })
  DOC_ID: string;

  @Column({
    nullable: true,
    type: Number,
  })
  AZIENDA_ID?: number | null;

  @Column({
    nullable: false,
    type: String,
  })
  DES_PROD?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  COD_ART?: string | null;

  @Column({
    nullable: true,
    type: Number,
  })
  STATUS?: number | null;

  @OneToOne(() => OrpEffCicliEntity, (orpEffCicli) => orpEffCicli.orpEff)
  @JoinColumn({
    name: 'DOC_ID',
    referencedColumnName: 'DOC_ID',
  })
  orpEffCicli?: OrpEffCicliEntity | null;

  @OneToOne(() => X1TrasCodiciEntity, (x1TrasCodici) => x1TrasCodici.orpEff)
  @JoinColumn({
    name: 'SERIE_DOC',
    referencedColumnName: 'CODICE1',
  })
  x1TrasCodici?: X1TrasCodiciEntity | null;
}
