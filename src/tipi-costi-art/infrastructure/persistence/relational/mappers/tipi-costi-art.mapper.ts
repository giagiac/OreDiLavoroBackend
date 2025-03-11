import { tipiCostiArt } from '../../../../domain/tipi-costi-art';
import { tipiCostiArtEntity } from '../entities/tipi-costi-art.entity';

export class tipiCostiArtMapper {
  static toDomain(raw: tipiCostiArtEntity): tipiCostiArt {
    const domainEntity = new tipiCostiArt();
    domainEntity.COD_TIPO_COST = raw.COD_TIPO_COST;
    domainEntity.DES_TIPO_COST = raw.DES_TIPO_COST;
    domainEntity.TIPO_COSTO = raw.TIPO_COSTO;

    return domainEntity;
  }

  static toPersistence(domainEntity: tipiCostiArt): tipiCostiArtEntity {
    const persistenceEntity = new tipiCostiArtEntity();
    if (domainEntity.COD_TIPO_COST) {
      persistenceEntity.COD_TIPO_COST = domainEntity.COD_TIPO_COST;
    }
    persistenceEntity.DES_TIPO_COST = domainEntity.DES_TIPO_COST;
    persistenceEntity.TIPO_COSTO = domainEntity.TIPO_COSTO;

    return persistenceEntity;
  }
}
