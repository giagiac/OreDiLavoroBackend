import { OrdCliRigheEntity } from '../../../../../ord-cli-righes/infrastructure/persistence/relational/entities/ord-cli-righe.entity';

import { OrpEffCicliEntity } from '../../../../../orp-eff-ciclis/infrastructure/persistence/relational/entities/orp-eff-cicli.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'LINK_ORP_ORD',
})
export class LinkOrpOrdEntity extends EntityRelationalHelper {
  @OneToOne(() => OrdCliRigheEntity, (linkOrpOrd) => linkOrpOrd.linkOrpOrd, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({
    name: 'ORD_CLI_DOC_RIGA_ID',
    referencedColumnName: 'DOC_RIGA_ID',
  })
  ordCliRighe?: OrdCliRigheEntity | null;

  @PrimaryColumn()
  LINK_ORP_ORD_ID: string;

  @Column({
    nullable: false,
    type: String,
  })
  ORP_EFF_DOC_ID: string;

  @Column({
    nullable: false,
    type: String,
  })
  ORD_CLI_DOC_RIGA_ID: string;

  @ManyToOne(() => OrpEffCicliEntity, (parentEntity) => parentEntity.linkOrpOrd)
  @JoinColumn({ name: 'ORP_EFF_DOC_ID', referencedColumnName: 'DOC_ID' })
  orpEffCicli: OrpEffCicliEntity;
}
