import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ArticoliCostiCfCommEntity } from '../../../../../articoli-costi-cf-comm/infrastructure/persistence/relational/entities/articoli-costi-cf-comm.entity';
import { ArtCostiEntity } from '../../../../../art-costi/infrastructure/persistence/relational/entities/art-costi.entity';
import { EpsNestjsTargaMezziEntity } from '../../../../../eps-nestjs-targa-mezzis/infrastructure/persistence/relational/entities/eps-nestjs-targa-mezzi.entity';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';
import { EpsNestjsOrpEffCicliEsecChildEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esec-children/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec-child.entity';

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

  @OneToMany(() => ArtCostiEntity, (artCosti) => artCosti.artAna, {
    eager: true,
  })
  @JoinColumn({
    referencedColumnName: 'COD_ART',
    name: 'COD_ART',
  })
  artCosti: ArtCostiEntity[];

  // ---------------------------------------------------------------------------

  @ManyToOne(() => ArticoliCostiCfCommEntity)
  @JoinColumn({
    referencedColumnName: 'COD_ART',
    name: 'COD_ART',
  })
  articoliCostiCfComm: ArticoliCostiCfCommEntity | null;

  @OneToOne(() => EpsNestjsTargaMezziEntity, (epsNestjsTargaMezzi) => epsNestjsTargaMezzi.artAna)
  @JoinColumn({
    name: 'COD_ART',
    referencedColumnName: 'COD_ART',
  })
  epsNestjsTargaMezzi?: EpsNestjsTargaMezziEntity | null;

  // Articoli
  @OneToOne(() => EpsNestjsOrpEffCicliEsecEntity, (epsNestjsOrpEffCicliEsec) => epsNestjsOrpEffCicliEsec.artAna)
  @JoinColumn({
    name: 'COD_ART',
    referencedColumnName: 'COD_ART',
  })
  epsNestjsOrpEffCicliEsec?: EpsNestjsOrpEffCicliEsecEntity | null;

  // Articoli
  @OneToOne(() => EpsNestjsOrpEffCicliEsecChildEntity, (epsNestjsOrpEffCicliEsecChild) => epsNestjsOrpEffCicliEsecChild.artAna)
  @JoinColumn({
    name: 'COD_ART',
    referencedColumnName: 'COD_ART',
  })
  epsNestjsOrpEffCicliEsecChild?: EpsNestjsOrpEffCicliEsecChildEntity | null;
}
