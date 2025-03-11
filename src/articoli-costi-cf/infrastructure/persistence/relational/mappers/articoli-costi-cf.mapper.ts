import { ArticoliCostiCf } from '../../../../domain/articoli-costi-cf';
import { ArticoliCostiCfEntity } from '../entities/articoli-costi-cf.entity';

export class ArticoliCostiCfMapper {
  static toDomain(raw: ArticoliCostiCfEntity): ArticoliCostiCf {
    const domainEntity = new ArticoliCostiCf();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    domainEntity.COD_CF = raw.COD_CF;
    domainEntity.COD_ART = raw.COD_ART;
    domainEntity.TIPO_COSTO = raw.TIPO_COSTO;

    if(raw.artCosti){
      domainEntity.artCosti = raw.artCosti
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: ArticoliCostiCf): ArticoliCostiCfEntity {
    const persistenceEntity = new ArticoliCostiCfEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.TIPO_COSTO = domainEntity.TIPO_COSTO
    persistenceEntity.COD_ART = domainEntity.COD_ART
    persistenceEntity.COD_CF = domainEntity.COD_CF
    
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
