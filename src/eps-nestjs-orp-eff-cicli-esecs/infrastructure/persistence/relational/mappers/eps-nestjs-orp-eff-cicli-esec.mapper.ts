import { EpsNestjsOrpEffCicliEsec } from '../../../../domain/eps-nestjs-orp-eff-cicli-esec';

import { EpsNestjsOrpEffCicliEsecEntity } from '../entities/eps-nestjs-orp-eff-cicli-esec.entity';

export class EpsNestjsOrpEffCicliEsecMapper {
  static toDomain(
    raw: EpsNestjsOrpEffCicliEsecEntity,
  ): EpsNestjsOrpEffCicliEsec {
    const domainEntity = new EpsNestjsOrpEffCicliEsec();
    domainEntity.NUM_RIGA = raw.NUM_RIGA;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    domainEntity.APP_REQ3_SYNCED = raw.APP_REQ3_SYNCED;

    domainEntity.TEMPO_MINUTI_OP = raw.TEMPO_MINUTI_OP;

    domainEntity.TEMPO_MINUTI_MACC = raw.TEMPO_MINUTI_MACC;

    domainEntity.NOTE = raw.NOTE;

    domainEntity.DATA_FINE = raw.DATA_FINE;

    domainEntity.DATA_INIZIO = raw.DATA_INIZIO;

    domainEntity.TEMPO_OPERATORE = raw.TEMPO_OPERATORE;

    domainEntity.TEMPO_MACCHINA = raw.TEMPO_MACCHINA;

    domainEntity.COD_OP = raw.COD_OP;

    domainEntity.COD_ART = raw.COD_ART;

    domainEntity.DOC_RIGA_ESEC_ID = raw.DOC_RIGA_ESEC_ID;

    domainEntity.DOC_RIGA_ID = raw.DOC_RIGA_ID;

    domainEntity.DOC_ID = raw.DOC_ID;

    domainEntity.AZIENDA_ID = raw.AZIENDA_ID;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: EpsNestjsOrpEffCicliEsec,
  ): EpsNestjsOrpEffCicliEsecEntity {
    const persistenceEntity = new EpsNestjsOrpEffCicliEsecEntity();
    persistenceEntity.NUM_RIGA = domainEntity.NUM_RIGA;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    persistenceEntity.APP_REQ3_SYNCED = domainEntity.APP_REQ3_SYNCED;

    persistenceEntity.TEMPO_MINUTI_OP = domainEntity.TEMPO_MINUTI_OP;

    persistenceEntity.TEMPO_MINUTI_MACC = domainEntity.TEMPO_MINUTI_MACC;

    persistenceEntity.NOTE = domainEntity.NOTE;

    persistenceEntity.DATA_FINE = domainEntity.DATA_FINE;

    persistenceEntity.DATA_INIZIO = domainEntity.DATA_INIZIO;

    persistenceEntity.TEMPO_OPERATORE = domainEntity.TEMPO_OPERATORE;

    persistenceEntity.TEMPO_MACCHINA = domainEntity.TEMPO_MACCHINA;

    persistenceEntity.COD_OP = domainEntity.COD_OP;

    persistenceEntity.COD_ART = domainEntity.COD_ART;

    persistenceEntity.DOC_RIGA_ESEC_ID = domainEntity.DOC_RIGA_ESEC_ID;

    persistenceEntity.DOC_RIGA_ID = domainEntity.DOC_RIGA_ID;

    persistenceEntity.DOC_ID = domainEntity.DOC_ID;

    persistenceEntity.AZIENDA_ID = domainEntity.AZIENDA_ID;

    return persistenceEntity;
  }
}
