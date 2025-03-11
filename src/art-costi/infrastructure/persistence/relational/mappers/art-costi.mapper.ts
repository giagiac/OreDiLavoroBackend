import { ArtCosti } from '../../../../domain/art-costi';
import { ArtCostiEntity } from '../entities/art-costi.entity';

export class artCostiMapper {
  static toDomain(raw: ArtCostiEntity): ArtCosti {
    const domainEntity = new ArtCosti();
    domainEntity.COD_ART_TIPO_COST = raw.COD_ART_TIPO_COST;
    domainEntity.COD_ART = raw.COD_ART;
    domainEntity.COD_TIPO_COST = raw.COD_TIPO_COST;
    domainEntity.COSTO_ART = raw.COSTO_ART;
    domainEntity.DATA_RIF = raw.DATA_RIF;

    return domainEntity;
  }

  static toPersistence(domainEntity: ArtCosti): ArtCostiEntity {
    const persistenceEntity = new ArtCostiEntity();
    if (domainEntity.COD_ART_TIPO_COST) {
      persistenceEntity.COD_ART_TIPO_COST = domainEntity.COD_ART_TIPO_COST;
    }
    persistenceEntity.COD_ART = domainEntity.COD_ART;
    persistenceEntity.COD_TIPO_COST = domainEntity.COD_TIPO_COST;
    persistenceEntity.COSTO_ART = domainEntity.COSTO_ART;
    persistenceEntity.DATA_RIF = domainEntity.DATA_RIF;

    return persistenceEntity;
  }
}
