import { CfCommEntity } from '../../../../../cf-comm/infrastructure/persistence/relational/entities/cf-comm.entity';
import { ArticoliCostiCfComm } from '../../../../domain/articoli-costi-cf-comm';

import { ArticoliCostiCfCommEntity } from '../entities/articoli-costi-cf-comm.entity';

export class ArticoliCostiCfCommMapper {
  static toDomain(raw: ArticoliCostiCfCommEntity): ArticoliCostiCfComm {
    const domainEntity = new ArticoliCostiCfComm();
    domainEntity.TIPO_COSTO = raw.TIPO_COSTO;

    domainEntity.COD_ART = raw.COD_ART;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: ArticoliCostiCfComm,
  ): ArticoliCostiCfCommEntity {
    const persistenceEntity = new ArticoliCostiCfCommEntity();
    persistenceEntity.TIPO_COSTO = domainEntity.TIPO_COSTO;
    persistenceEntity.COD_ART = domainEntity.COD_ART;
    persistenceEntity.CF_COMM_ID = domainEntity.CF_COMM_ID;

    if (domainEntity.CfComm) {
      domainEntity.CfComm = new CfCommEntity();
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
