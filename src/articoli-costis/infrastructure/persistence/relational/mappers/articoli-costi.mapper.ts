import { CfCommEntity } from '../../../../../cf-comms/infrastructure/persistence/relational/entities/cf-comm.entity';
import { ArticoliCosti } from '../../../../domain/articoli-costi';

import { ArticoliCostiEntity } from '../entities/articoli-costi.entity';

export class ArticoliCostiMapper {
  static toDomain(raw: ArticoliCostiEntity): ArticoliCosti {
    const domainEntity = new ArticoliCosti();
    domainEntity.costo2 = raw.costo2;

    domainEntity.costo1 = raw.costo1;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ArticoliCosti): ArticoliCostiEntity {
    const persistenceEntity = new ArticoliCostiEntity();
    persistenceEntity.costo2 = domainEntity.costo2;
    persistenceEntity.costo1 = domainEntity.costo1;
    persistenceEntity.CF_COMM_ID = domainEntity.CF_COMM_ID

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
