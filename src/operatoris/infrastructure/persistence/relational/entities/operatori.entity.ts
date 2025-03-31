import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';

@Entity({
  name: 'OPERATORI',
})
export class OperatoriEntity extends EntityRelationalHelper {
  @PrimaryColumn()
  COD_OP: string;

  @Column({ type: String, nullable: true })
  NOME_OP?: string | null;

  @Column({ type: Number, nullable: true })
  AZIENDA_ID?: number | null;

  @Column({ type: String, nullable: true })
  X_COD_BADGE?: string | null;

  @Column({ type: String, nullable: true })
  UTENTE?: string | null;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.operatori)
  @JoinColumn({
    name: 'COD_OP',
    referencedColumnName: 'COD_OP',
  })
  user?: UserEntity | null;

  // tabella di HG - dati dei cicli DOC_RIGA_ID - l'utente cerca per codice COMMESSA :
  // il codice COMMESSA BREVE, l'ultimo carattere è in numero del ciclo
  // riferimento inverso a eps-nestjs-orp-eff-cicli-esec
  @OneToMany(
    () => EpsNestjsOrpEffCicliEsecEntity,
    (epsNestjsOrpEffCicliEsec) => epsNestjsOrpEffCicliEsec.orpEffCicli,
  )
  @JoinColumn({
    name: 'COD_OP',
    referencedColumnName: 'COD_OP',
  })
  epsNestjsOrpEffCicliEsec?: EpsNestjsOrpEffCicliEsecEntity | null;
}
