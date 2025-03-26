import { X1TrasCodici } from '../../../../domain/x1-tras-codici';

import { X1TrasCodiciEntity } from '../entities/x1-tras-codici.entity';

export class X1TrasCodiciMapper {
  static toDomain(raw: X1TrasCodiciEntity): X1TrasCodici {
    const domainEntity = new X1TrasCodici();
    domainEntity.CODICE2 = raw.CODICE2;

    domainEntity.CODICE1 = raw.CODICE1;

    return domainEntity;
  }

  static toPersistence(domainEntity: X1TrasCodici): X1TrasCodiciEntity {
    const persistenceEntity = new X1TrasCodiciEntity();
    persistenceEntity.CODICE2 = domainEntity.CODICE2;

    persistenceEntity.CODICE1 = domainEntity.CODICE1;

    return persistenceEntity;
  }
}
