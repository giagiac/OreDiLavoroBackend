import { ArticoliCostiCf } from '../../../../domain/articoli-costi-cf';
import { ArticoliCostiCfEntity } from '../entities/articoli-costi-cf.entity';

export class ArticoliCostiCfMapper {
  static toDomain(raw: ArticoliCostiCfEntity): ArticoliCostiCf {
    const domainEntity = new ArticoliCostiCf();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ArticoliCostiCf): ArticoliCostiCfEntity {
    const persistenceEntity = new ArticoliCostiCfEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
