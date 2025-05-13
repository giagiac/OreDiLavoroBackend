import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { OrdCliRigheEntity } from '../../../../../ord-cli-righes/infrastructure/persistence/relational/entities/ord-cli-righe.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { CfCommEntity } from '../../../../../cf-comms/infrastructure/persistence/relational/entities/cf-comm.entity';

@Entity({
  name: 'ORD_CLI',
})
export class OrdCliEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  NUM_SEDE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  COD_CF?: string | null;

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
    type: String,
  })
  DOC_ID: string;

  @Column({
    nullable: true,
    type: Number,
  })
  AZIENDA_ID?: number | null;

  @OneToOne(() => OrdCliRigheEntity, (ordCliRighe) => ordCliRighe.ordCli)
  @JoinColumn({
    name: 'DOC_ID',
    referencedColumnName: 'DOC_ID',
  })
  ordCliRighe?: OrdCliRigheEntity | null;

  @OneToOne(() => CfCommEntity, (cfComm) => cfComm.ordCli)
  @JoinColumn([
    {
      name: 'COD_CF',
      referencedColumnName: 'COD_CF',
    },
    {
      name: 'NUM_SEDE',
      referencedColumnName: 'NUM_SEDE',
    },
  ])
  cfComm?: CfCommEntity | null;
}
