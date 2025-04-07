import { ArticoliCostiCfCommMapper } from '../../../../../articoli-costi-cf-comm/infrastructure/persistence/relational/mappers/articoli-costi-cf-comm.mapper';
import { CfComm } from '../../../../domain/cf-comm';

import { CfCommEntity } from '../entities/cf-comm.entity';

export class CfCommMapper {
  static toDomain(raw: CfCommEntity): CfComm {
    const domainEntity = new CfComm();
    domainEntity.NODE_SEDE = raw.NOTE_SEDE;

    domainEntity.RIFERIMENTO_SEDE = raw.RIFERIMENTO_SEDE;

    domainEntity.E_MAIL_SEDE = raw.E_MAIL_SEDE;

    domainEntity.FAX_SEDE = raw.FAX_SEDE;

    domainEntity.TEL_SEDE = raw.TEL_SEDE;

    domainEntity.PROVINCIA_SEDE = raw.PROVINCIA_SEDE;

    domainEntity.COMUNE_SEDE = raw.COMUNE_SEDE;

    domainEntity.CAP_SEDE = raw.CAP_SEDE;

    domainEntity.INDI_SEDE = raw.INDI_SEDE;

    domainEntity.CF_COMM_ID = raw.CF_COMM_ID;

    domainEntity.COD_CF = raw.COD_CF;

    domainEntity.DES_SEDE = raw.DES_SEDE;

    domainEntity.NUM_SEDE = raw.NUM_SEDE;

    domainEntity.COD_CF = raw.CF_COMM_ID;

    domainEntity.X_CIVICO_NUMERO = raw.X_CIVICO_NUMERO;

    domainEntity.X_FRAZIONE = raw.X_FRAZIONE;

    domainEntity.X_ZONA = raw.X_ZONA;

    if (raw.articoliCostiCfComm) {
      domainEntity.articoliCostiCfComm = raw.articoliCostiCfComm.map((it) =>
        ArticoliCostiCfCommMapper.toDomain(it),
      );
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: CfComm): CfCommEntity {
    const persistenceEntity = new CfCommEntity();
    persistenceEntity.NOTE_SEDE = domainEntity.NODE_SEDE;

    persistenceEntity.RIFERIMENTO_SEDE = domainEntity.RIFERIMENTO_SEDE;

    persistenceEntity.E_MAIL_SEDE = domainEntity.E_MAIL_SEDE;

    persistenceEntity.FAX_SEDE = domainEntity.FAX_SEDE;

    persistenceEntity.TEL_SEDE = domainEntity.TEL_SEDE;

    persistenceEntity.PROVINCIA_SEDE = domainEntity.PROVINCIA_SEDE;

    persistenceEntity.COMUNE_SEDE = domainEntity.COMUNE_SEDE;

    persistenceEntity.CAP_SEDE = domainEntity.CAP_SEDE;

    persistenceEntity.INDI_SEDE = domainEntity.INDI_SEDE;

    persistenceEntity.CF_COMM_ID = domainEntity.CF_COMM_ID;

    persistenceEntity.COD_CF = domainEntity.COD_CF;

    persistenceEntity.DES_SEDE = domainEntity.DES_SEDE;

    persistenceEntity.NUM_SEDE = domainEntity.NUM_SEDE;

    persistenceEntity.X_CIVICO_NUMERO = domainEntity.X_CIVICO_NUMERO;

    persistenceEntity.X_FRAZIONE = domainEntity.X_FRAZIONE;

    persistenceEntity.X_ZONA = domainEntity.X_ZONA;

    if (domainEntity.COD_CF) {
      persistenceEntity.CF_COMM_ID = domainEntity.COD_CF;
    }

    return persistenceEntity;
  }
}
