import { ArtAnaMapper } from '../../../../../art-ana/infrastructure/persistence/relational/mappers/art-ana.mapper';
import { ArticoliCostiCfComm } from '../../../../domain/articoli-costi-cf-comm';

import { ArticoliCostiCfCommEntity } from '../entities/articoli-costi-cf-comm.entity';

export class ArticoliCostiCfCommMapper {
  static toDomain(raw: ArticoliCostiCfCommEntity): ArticoliCostiCfComm {
    const domainEntity = new ArticoliCostiCfComm();
    domainEntity.TIPO_TRASFERTA = raw.TIPO_TRASFERTA;

    domainEntity.COD_ART = raw.COD_ART;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    domainEntity.CF_COMM_ID = raw.CF_COMM_ID;
    domainEntity.COD_ART = raw.COD_ART;
    domainEntity.TIPO_TRASFERTA = raw.TIPO_TRASFERTA;

    if (raw.artAna) {
      domainEntity.artAna = ArtAnaMapper.toDomain(raw.artAna);
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: ArticoliCostiCfComm): ArticoliCostiCfCommEntity {
    const persistenceEntity = new ArticoliCostiCfCommEntity();
    persistenceEntity.TIPO_TRASFERTA = domainEntity.TIPO_TRASFERTA;
    persistenceEntity.COD_ART = domainEntity.COD_ART;
    persistenceEntity.CF_COMM_ID = domainEntity.CF_COMM_ID;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
