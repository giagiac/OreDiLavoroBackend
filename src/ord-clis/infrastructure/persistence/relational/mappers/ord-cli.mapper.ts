import { CfCommMapper } from '../../../../../cf-comms/infrastructure/persistence/relational/mappers/cf-comm.mapper';
import { OrdCli } from '../../../../domain/ord-cli';

import { OrdCliEntity } from '../entities/ord-cli.entity';

export class OrdCliMapper {
  static toDomain(raw: OrdCliEntity): OrdCli {
    const domainEntity = new OrdCli();
    domainEntity.NUM_SEDE = raw.NUM_SEDE;

    domainEntity.COD_CF = raw.COD_CF;

    domainEntity.DATA_DOC = raw.DATA_DOC;

    domainEntity.SERIE_DOC = raw.SERIE_DOC;

    domainEntity.NUM_DOC = raw.NUM_DOC;

    domainEntity.ANNO_DOC = raw.ANNO_DOC;

    domainEntity.DOC_ID = raw.DOC_ID;

    domainEntity.AZIENDA_ID = raw.AZIENDA_ID;

    if (raw.cfComm) {
      domainEntity.cfComm = CfCommMapper.toDomain(raw.cfComm);
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: OrdCli): OrdCliEntity {
    const persistenceEntity = new OrdCliEntity();
    persistenceEntity.NUM_SEDE = domainEntity.NUM_SEDE;

    persistenceEntity.COD_CF = domainEntity.COD_CF;

    persistenceEntity.DATA_DOC = domainEntity.DATA_DOC;

    persistenceEntity.SERIE_DOC = domainEntity.SERIE_DOC;

    persistenceEntity.NUM_DOC = domainEntity.NUM_DOC;

    persistenceEntity.ANNO_DOC = domainEntity.ANNO_DOC;

    persistenceEntity.DOC_ID = domainEntity.DOC_ID;

    persistenceEntity.AZIENDA_ID = domainEntity.AZIENDA_ID;

    return persistenceEntity;
  }
}
