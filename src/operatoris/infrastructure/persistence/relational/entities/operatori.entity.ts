import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'OPERATORI',
})
export class OperatoriEntity extends EntityRelationalHelper {
  @PrimaryColumn()
  COD_OP: string;

  @Column({ type: String, nullable: true })
  NOME_OP?: String | null;

  @Column({ type: Number, nullable: true })
  AZIENDA_ID?: number | null;

  @Column({ type: String, nullable: true })
  X_COD_BADGE?: String | null;

  @Column({ type: String, nullable: true })
  UTENTE?: String | null;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.operatori)
  @JoinColumn({
    name: "COD_OP",
    referencedColumnName: 'COD_OP',
  })
  user?: UserEntity | null;
}
