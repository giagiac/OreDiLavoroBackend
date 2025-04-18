import { HypServReq2 } from '../../../../domain/hyp-serv-req2';

import { HypServReq2Entity } from '../entities/hyp-serv-req2.entity';

export class HypServReq2Mapper {
  static toDomain(raw: HypServReq2Entity): HypServReq2 {
    const domainEntity = new HypServReq2();

    domainEntity.NUM_AZIENDA = raw.NUM_AZIENDA;

    domainEntity.COD_REQ2_HYPSERV = raw.COD_REQ2_HYPSERV;

    domainEntity.PROGR = raw.PROGR;

    domainEntity.UTENTE_FROM = raw.UTENTE_FROM;

    // Nuove proprietà
    domainEntity.DATAORA_RICHIESTA = raw.DATAORA_RICHIESTA;
    domainEntity.CAMPO_PARAMETRI = raw.CAMPO_PARAMETRI;
    domainEntity.FLAG_STATUS = raw.FLAG_STATUS;
    domainEntity.DATAORA_INIZIO_ELAB = raw.DATAORA_INIZIO_ELAB;
    domainEntity.UTENTE_ELAB = raw.UTENTE_ELAB;
    domainEntity.DATAORA_FINE_ELAB = raw.DATAORA_FINE_ELAB;
    domainEntity.FLAG_ESITO_ELAB = raw.FLAG_ESITO_ELAB;
    domainEntity.STRINGA_ESITO_ELAB = raw.STRINGA_ESITO_ELAB;

    return domainEntity;
  }

  static toPersistence(domainEntity: HypServReq2): HypServReq2Entity {
    const persistenceEntity = new HypServReq2Entity();

    persistenceEntity.NUM_AZIENDA = domainEntity.NUM_AZIENDA;

    persistenceEntity.COD_REQ2_HYPSERV = domainEntity.COD_REQ2_HYPSERV;

    persistenceEntity.PROGR = domainEntity.PROGR;

    persistenceEntity.UTENTE_FROM = domainEntity.UTENTE_FROM;

    // Nuove proprietà
    persistenceEntity.DATAORA_RICHIESTA = domainEntity.DATAORA_RICHIESTA;
    persistenceEntity.CAMPO_PARAMETRI = domainEntity.CAMPO_PARAMETRI;
    persistenceEntity.FLAG_STATUS = domainEntity.FLAG_STATUS;
    persistenceEntity.DATAORA_INIZIO_ELAB = domainEntity.DATAORA_INIZIO_ELAB;
    persistenceEntity.UTENTE_ELAB = domainEntity.UTENTE_ELAB;
    persistenceEntity.DATAORA_FINE_ELAB = domainEntity.DATAORA_FINE_ELAB;
    persistenceEntity.FLAG_ESITO_ELAB = domainEntity.FLAG_ESITO_ELAB;
    persistenceEntity.STRINGA_ESITO_ELAB = domainEntity.STRINGA_ESITO_ELAB;

    return persistenceEntity;
  }
}
