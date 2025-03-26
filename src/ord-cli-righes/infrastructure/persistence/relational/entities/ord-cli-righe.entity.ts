import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { LinkOrpOrdEntity } from '../../../../../link-orp-ords/infrastructure/persistence/relational/entities/link-orp-ord.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'ORD_CLI_RIGHE',
})
export class OrdCliRigheEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  DES_RIGA?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  COD_ART?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  COD_CF?: string | null;

  @PrimaryColumn({
    nullable: false,
    type: String,
  })
  DOC_RIGA_ID: string;

  @Column({
    nullable: false,
    type: Number,
  })
  NUM_RIGA: number;

  @Column({
    nullable: false,
    type: String,
  })
  DOC_ID: string;

  @Column({
    nullable: true,
    type: Number,
  })
  AZIENDA_ID?: number | null;

  // ------------------------------------------------------------------------

  @OneToOne(() => LinkOrpOrdEntity, (linkOrpOrd) => linkOrpOrd.ordCliRighe)
  @JoinColumn({
    name: 'DOC_RIGA_ID',
    referencedColumnName: 'ORD_CLI_DOC_RIGA_ID',
  })
  linkOrpOrd?: LinkOrpOrdEntity | null;
}
