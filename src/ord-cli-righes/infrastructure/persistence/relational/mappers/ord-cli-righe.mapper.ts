import { CfMapper } from '../../../../../cfs/infrastructure/persistence/relational/mappers/cf.mapper';
import { OrdCliTrasMapper } from '../../../../../ord-cli-tras/infrastructure/persistence/relational/mappers/ord-cli-tras.mapper';
import { OrdCliRighe } from '../../../../domain/ord-cli-righe';

import { OrdCliRigheEntity } from '../entities/ord-cli-righe.entity';

export class OrdCliRigheMapper {
  static toDomain(raw: OrdCliRigheEntity): OrdCliRighe {
    const domainEntity = new OrdCliRighe();
    domainEntity.DES_RIGA = raw.DES_RIGA;

    domainEntity.COD_ART = raw.COD_ART;

    domainEntity.COD_CF = raw.COD_CF;

    domainEntity.DOC_RIGA_ID = raw.DOC_RIGA_ID;

    domainEntity.NUM_RIGA = raw.NUM_RIGA;

    domainEntity.DOC_ID = raw.DOC_ID;

    domainEntity.AZIENDA_ID = raw.AZIENDA_ID;

    if (raw.cf) {
      domainEntity.cf = CfMapper.toDomain(raw.cf);
    }

    if (raw.ordCliTras) {
      domainEntity.ordCliTras = OrdCliTrasMapper.toDomain(raw.ordCliTras);
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: OrdCliRighe): OrdCliRigheEntity {
    const persistenceEntity = new OrdCliRigheEntity();
    persistenceEntity.DES_RIGA = domainEntity.DES_RIGA;

    persistenceEntity.COD_ART = domainEntity.COD_ART;

    persistenceEntity.COD_CF = domainEntity.COD_CF;

    persistenceEntity.DOC_RIGA_ID = domainEntity.DOC_RIGA_ID;

    persistenceEntity.NUM_RIGA = domainEntity.NUM_RIGA;

    persistenceEntity.DOC_ID = domainEntity.DOC_ID;

    persistenceEntity.AZIENDA_ID = domainEntity.AZIENDA_ID;

    return persistenceEntity;
  }
}
