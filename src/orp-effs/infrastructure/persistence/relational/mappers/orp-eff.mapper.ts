import { OrpEff } from '../../../../domain/orp-eff';

import { OrpEffEntity } from '../entities/orp-eff.entity';

export class OrpEffMapper {
  static toDomain(raw: OrpEffEntity): OrpEff {
    const domainEntity = new OrpEff();
    domainEntity.DATA_DOC = raw.DATA_DOC;

    domainEntity.SERIE_DOC = raw.SERIE_DOC;

    domainEntity.NUM_DOC = raw.NUM_DOC;

    domainEntity.ANNO_DOC = raw.ANNO_DOC;

    domainEntity.DOC_ID = raw.DOC_ID;

    domainEntity.AZIENDA_ID = raw.AZIENDA_ID;

    domainEntity.x1TrasCodici = raw.x1TrasCodici;

    return domainEntity;
  }

  static toPersistence(domainEntity: OrpEff): OrpEffEntity {
    const persistenceEntity = new OrpEffEntity();
    persistenceEntity.DATA_DOC = domainEntity.DATA_DOC;

    persistenceEntity.SERIE_DOC = domainEntity.SERIE_DOC;

    persistenceEntity.NUM_DOC = domainEntity.NUM_DOC;

    persistenceEntity.ANNO_DOC = domainEntity.ANNO_DOC;

    persistenceEntity.DOC_ID = domainEntity.DOC_ID;

    persistenceEntity.AZIENDA_ID = domainEntity.AZIENDA_ID;

    return persistenceEntity;
  }
}
