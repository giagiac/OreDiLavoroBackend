import { OrdCliTras } from '../../../../domain/ord-cli-tras';

import { OrdCliTrasEntity } from '../entities/ord-cli-tras.entity';

export class OrdCliTrasMapper {
  static toDomain(raw: OrdCliTrasEntity): OrdCliTras {
    const domainEntity = new OrdCliTras();
    domainEntity.DOC_ID = raw.DOC_ID;

    domainEntity.NOTE_DEST_MERCE = raw.NOTE_DEST_MERCE;

    domainEntity.TEL_DEST_MERCE = raw.TEL_DEST_MERCE;

    domainEntity.STATO_DEST_MERCE = raw.STATO_DEST_MERCE;

    domainEntity.PROVINCIA_DEST_MERCE = raw.PROVINCIA_DEST_MERCE;

    domainEntity.CAP_DEST_MERCE = raw.CAP_DEST_MERCE;

    domainEntity.COMUNE_DEST_MERCE = raw.COMUNE_DEST_MERCE;

    domainEntity.INDI_DEST_MERCE = raw.INDI_DEST_MERCE;

    domainEntity.DES_DEST_MERCE = raw.DES_DEST_MERCE;

    domainEntity.NUM_DEST = raw.NUM_DEST;

    return domainEntity;
  }

  static toPersistence(domainEntity: OrdCliTras): OrdCliTrasEntity {
    const persistenceEntity = new OrdCliTrasEntity();
    persistenceEntity.DOC_ID = domainEntity.DOC_ID;

    persistenceEntity.NOTE_DEST_MERCE = domainEntity.NOTE_DEST_MERCE;

    persistenceEntity.TEL_DEST_MERCE = domainEntity.TEL_DEST_MERCE;

    persistenceEntity.STATO_DEST_MERCE = domainEntity.STATO_DEST_MERCE;

    persistenceEntity.PROVINCIA_DEST_MERCE = domainEntity.PROVINCIA_DEST_MERCE;

    persistenceEntity.CAP_DEST_MERCE = domainEntity.CAP_DEST_MERCE;

    persistenceEntity.COMUNE_DEST_MERCE = domainEntity.COMUNE_DEST_MERCE;

    persistenceEntity.INDI_DEST_MERCE = domainEntity.INDI_DEST_MERCE;

    persistenceEntity.DES_DEST_MERCE = domainEntity.DES_DEST_MERCE;

    persistenceEntity.NUM_DEST = domainEntity.NUM_DEST;

    return persistenceEntity;
  }
}
