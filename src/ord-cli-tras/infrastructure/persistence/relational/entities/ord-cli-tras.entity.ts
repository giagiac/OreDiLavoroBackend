import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,

} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { LinkOrpOrdEntity } from '../../../../../link-orp-ords/infrastructure/persistence/relational/entities/link-orp-ord.entity';
import { OrdCliRigheEntity } from '../../../../../ord-cli-righes/infrastructure/persistence/relational/entities/ord-cli-righe.entity';

@Entity({
  name: 'ORD_CLI_TRAS',
})
export class OrdCliTrasEntity extends EntityRelationalHelper {
  @PrimaryColumn()
  DOC_ID: string;

  @Column({
    nullable: true,
    type: String,
  })
  NOTE_DEST_MERCE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  TEL_DEST_MERCE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  STATO_DEST_MERCE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  PROVINCIA_DEST_MERCE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  CAP_DEST_MERCE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  COMUNE_DEST_MERCE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  INDI_DEST_MERCE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  DES_DEST_MERCE?: string | null;

  @Column({
    nullable: false,
    type: Number,
  })
  NUM_DEST: number;

  // -----------------------------------

  @OneToOne(() => OrdCliRigheEntity, (ordCliRighe) => ordCliRighe.ordCliTras)
  @JoinColumn({
    name: 'DOC_ID',
    referencedColumnName: 'DOC_ID',
  })
  ordCliRighe?: OrdCliRigheEntity | null;
}
