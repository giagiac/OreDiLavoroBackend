import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';
import { EpsNestjsOrpEffCicliEsecChildEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esec-children/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec-child.entity';

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

  @Column({ type: String, nullable: true })
  COD_PALMARE?: string | null;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.operatori)
  @JoinColumn({
    name: 'COD_OP',
    referencedColumnName: 'COD_OP',
  })
  user?: UserEntity | null;

  // riferimento inverso a eps-nestjs-orp-eff-cicli-esec
  @OneToMany(() => EpsNestjsOrpEffCicliEsecEntity, (epsNestjsOrpEffCicliEsec) => epsNestjsOrpEffCicliEsec.operatori)
  @JoinColumn({
    name: 'COD_OP',
    referencedColumnName: 'COD_OP',
  })
  epsNestjsOrpEffCicliEsec?: Array<EpsNestjsOrpEffCicliEsecEntity> | null;

  // riferimento inverso a eps-nestjs-orp-eff-cicli-esec- child
  @OneToMany(() => EpsNestjsOrpEffCicliEsecChildEntity, (epsNestjsOrpEffCicliEsecChild) => epsNestjsOrpEffCicliEsecChild.operatori)
  @JoinColumn({
    name: 'COD_OP',
    referencedColumnName: 'COD_OP',
  })
  epsNestjsOrpEffCicliEsecChild?: Array<EpsNestjsOrpEffCicliEsecChildEntity> | null;
}
