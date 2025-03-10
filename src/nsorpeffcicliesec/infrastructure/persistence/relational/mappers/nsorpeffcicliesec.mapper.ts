import { nsorpeffcicliesec } from '../../../../domain/nsorpeffcicliesec';

import { nsorpeffcicliesecEntity } from '../entities/nsorpeffcicliesec.entity';

export class nsorpeffcicliesecMapper {
  static toDomain(raw: nsorpeffcicliesecEntity): nsorpeffcicliesec {
    const domainEntity = new nsorpeffcicliesec();
    domainEntity.DOC_RIGA_ID = raw.DOC_RIGA_ID;

    domainEntity.NUM_RIGA = raw.NUM_RIGA;

    domainEntity.DOC_ID = raw.DOC_ID;

    domainEntity.AZIENDA_ID = raw.AZIENDA_ID;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: nsorpeffcicliesec,
  ): nsorpeffcicliesecEntity {
    const persistenceEntity = new nsorpeffcicliesecEntity();
    persistenceEntity.DOC_RIGA_ID = domainEntity.DOC_RIGA_ID;

    persistenceEntity.NUM_RIGA = domainEntity.NUM_RIGA;

    persistenceEntity.DOC_ID = domainEntity.DOC_ID;

    persistenceEntity.AZIENDA_ID = domainEntity.AZIENDA_ID;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
