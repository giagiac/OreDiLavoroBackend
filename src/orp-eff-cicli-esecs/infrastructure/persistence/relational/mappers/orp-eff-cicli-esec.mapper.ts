import { OrpEffCicliMapper } from '../../../../../orp-eff-ciclis/infrastructure/persistence/relational/mappers/orp-eff-cicli.mapper';
import { OrpEffCicliEsec } from '../../../../domain/orp-eff-cicli-esec';

import { EpsNestjsOrpEffCicliEsecMapper } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/mappers/eps-nestjs-orp-eff-cicli-esec.mapper';
import { OrpEffCicliEsecEntity } from '../entities/orp-eff-cicli-esec.entity';

export class OrpEffCicliEsecMapper {
  static toDomain(raw: OrpEffCicliEsecEntity): OrpEffCicliEsec {
    const domainEntity = new OrpEffCicliEsec();
    if (raw.orpEffCicli) {
      domainEntity.orpEffCicli = raw.orpEffCicli.map((it) =>
        OrpEffCicliMapper.toDomain(it),
      );
    } else if (raw.orpEffCicli === null) {
      domainEntity.orpEffCicli = null;
    }

    if (raw.epsNestjsOrpEffCicliEsec) {
      domainEntity.epsNestjsOrpEffCicliEsec =
        EpsNestjsOrpEffCicliEsecMapper.toDomain(raw.epsNestjsOrpEffCicliEsec);
    } else if (raw.orpEffCicli === null) {
      domainEntity.epsNestjsOrpEffCicliEsec = null;
    }

    domainEntity.DATA_FINE = raw.DATA_FINE;

    domainEntity.DATA_INIZIO = raw.DATA_INIZIO;

    domainEntity.TEMPO_OPERATORE = raw.TEMPO_OPERATORE;

    domainEntity.DOC_RIGA_ESEC_ID = raw.DOC_RIGA_ESEC_ID;

    domainEntity.NUM_ESEC = raw.NUM_ESEC;

    domainEntity.DOC_RIGA_ID = raw.DOC_RIGA_ID;

    domainEntity.NUM_RIGA = raw.NUM_RIGA;

    domainEntity.DOC_ID = raw.DOC_ID;

    domainEntity.AZIENDA_ID = raw.AZIENDA_ID;

    domainEntity.CODICE_BREVE = raw.CODICE_BREVE;

    return domainEntity;
  }

  static toPersistence(domainEntity: OrpEffCicliEsec): OrpEffCicliEsecEntity {
    const persistenceEntity = new OrpEffCicliEsecEntity();
    // if (domainEntity.orpEffCicli) {
    //   persistenceEntity.orpEffCicli = OrpEffCicliMapper.toPersistence(
    //     domainEntity.orpEffCicli,
    //   );
    // } else if (domainEntity.orpEffCicli === null) {
    //   persistenceEntity.orpEffCicli = null;
    // }

    persistenceEntity.DATA_FINE = domainEntity.DATA_FINE;

    persistenceEntity.DATA_INIZIO = domainEntity.DATA_INIZIO;

    persistenceEntity.TEMPO_OPERATORE = domainEntity.TEMPO_OPERATORE;

    persistenceEntity.DOC_RIGA_ESEC_ID = domainEntity.DOC_RIGA_ESEC_ID;

    persistenceEntity.NUM_ESEC = domainEntity.NUM_ESEC;

    persistenceEntity.DOC_RIGA_ID = domainEntity.DOC_RIGA_ID;

    persistenceEntity.NUM_RIGA = domainEntity.NUM_RIGA;

    persistenceEntity.DOC_ID = domainEntity.DOC_ID;

    persistenceEntity.AZIENDA_ID = domainEntity.AZIENDA_ID;

    return persistenceEntity;
  }
}
