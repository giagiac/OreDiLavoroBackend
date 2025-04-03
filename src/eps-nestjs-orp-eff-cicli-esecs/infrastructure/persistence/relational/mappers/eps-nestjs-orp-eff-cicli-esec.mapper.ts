import Decimal from 'decimal.js';
import { EpsNestjsOrpEffCicliEsec } from '../../../../domain/eps-nestjs-orp-eff-cicli-esec';

import { EpsNestjsOrpEffCicliEsecEntity } from '../entities/eps-nestjs-orp-eff-cicli-esec.entity';
import { OrpEffCicli } from '../../../../../orp-eff-ciclis/domain/orp-eff-cicli';
import { OrpEffCicliMapper } from '../../../../../orp-eff-ciclis/infrastructure/persistence/relational/mappers/orp-eff-cicli.mapper';
import { TempoOperatoreToSessantesimiTransformer } from '../../../../../utils/transformers/tempo-in-sessaantesimi.transformer';

const transformer = new TempoOperatoreToSessantesimiTransformer();

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

    domainEntity.TEMPO_OPERATORE_SESSANTESIMI = transformer.convertiOreInFormatoHHMM(Number(raw.TEMPO_OPERATORE))

    if (raw.orpEffCicli) {
      domainEntity.orpEffCicli = OrpEffCicliMapper.toDomain(raw.orpEffCicli);
    }

    return domainEntity;
  }

  static toPersistence(
    domainEntity: EpsNestjsOrpEffCicliEsec,
  ): EpsNestjsOrpEffCicliEsecEntity {
    // Imposta DATA_INIZIO al momento attuale
    const DATA_INIZIO = new Date();

    // Calcola TEMPO_OPERATORE_MS considerando la parte intera come ore e la parte decimale come centesimi di ora
    const TEMPO_OPERATORE = Number(domainEntity.TEMPO_OPERATORE) || 0;
    const ore = Math.floor(TEMPO_OPERATORE); // Parte intera (ore)
    const centesimi = TEMPO_OPERATORE - ore; // Parte decimale (centesimi di ora)
    const TEMPO_OPERATORE_MS =
      ore * 60 * 60 * 1000 + centesimi * 60 * 60 * 1000;

    // Calcola DATA_FINE aggiungendo TEMPO_OPERATORE_MS a DATA_INIZIO
    const DATA_FINE = new Date(DATA_INIZIO.getTime() + TEMPO_OPERATORE_MS);

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

    persistenceEntity.DATA_FINE = DATA_FINE;

    persistenceEntity.DATA_INIZIO = DATA_FINE;

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
