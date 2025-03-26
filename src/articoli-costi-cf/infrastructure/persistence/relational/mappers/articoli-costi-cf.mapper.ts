import { ArtAnaMapper } from '../../../../../art-ana/infrastructure/persistence/relational/mappers/art-ana.mapper';
import { ArticoliCostiCf } from '../../../../domain/articoli-costi-cf';
import { ArticoliCostiCfEntity } from '../entities/articoli-costi-cf.entity';

export class ArticoliCostiCfMapper {
  static toDomain(raw: ArticoliCostiCfEntity): ArticoliCostiCf {
    const domainEntity = new ArticoliCostiCf();
    domainEntity.TIPO_COSTO = raw.TIPO_COSTO;

    domainEntity.COD_ART = raw.COD_ART;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    domainEntity.COD_CF = raw.COD_CF;
    domainEntity.COD_ART = raw.COD_ART;
    domainEntity.TIPO_COSTO = raw.TIPO_COSTO;

    if (raw.artAna) {
      domainEntity.artAna = ArtAnaMapper.toDomain(raw.artAna);
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: ArticoliCostiCf): ArticoliCostiCfEntity {
    const persistenceEntity = new ArticoliCostiCfEntity();
    persistenceEntity.TIPO_COSTO = domainEntity.TIPO_COSTO;
    persistenceEntity.COD_ART = domainEntity.COD_ART;
    persistenceEntity.COD_CF = domainEntity.COD_CF;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
