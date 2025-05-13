import { EpsNestjsDestinazioni } from '../../../../domain/eps-nestjs-destinazioni';

import { EpsNestjsDestinazioniEntity } from '../entities/eps-nestjs-destinazioni.entity';

export class EpsNestjsDestinazioniMapper {
  static toDomain(raw: EpsNestjsDestinazioniEntity): EpsNestjsDestinazioni {
    const domainEntity = new EpsNestjsDestinazioni();
    domainEntity.RESPONSE = raw.RESPONSE;

    domainEntity.VALUE = raw.VALUE;

    domainEntity.KM = raw.KM;

    domainEntity.LINK = raw.LINK;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: EpsNestjsDestinazioni): EpsNestjsDestinazioniEntity {
    const persistenceEntity = new EpsNestjsDestinazioniEntity();
    persistenceEntity.RESPONSE = domainEntity.RESPONSE;

    persistenceEntity.VALUE = domainEntity.VALUE;

    persistenceEntity.KM = domainEntity.KM;

    persistenceEntity.LINK = domainEntity.LINK;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
