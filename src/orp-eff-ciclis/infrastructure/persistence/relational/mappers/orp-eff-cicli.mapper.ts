import { LinkOrpOrdMapper } from '../../../../../link-orp-ords/infrastructure/persistence/relational/mappers/link-orp-ord.mapper';
import { OrpEffCicli } from '../../../../domain/orp-eff-cicli';

import { OrpEffCicliEntity } from '../entities/orp-eff-cicli.entity';

export class OrpEffCicliMapper {
  static toDomain(raw: OrpEffCicliEntity): OrpEffCicli {
    const domainEntity = new OrpEffCicli();
    domainEntity.CODICE_BREVE = raw.CODICE_BREVE;

    domainEntity.DES_LAV = raw.DES_LAV;

    domainEntity.DES_CICLO = raw.DES_CICLO;

    domainEntity.DOC_RIGA_ID = raw.DOC_RIGA_ID;

    domainEntity.NUM_RIGA = raw.NUM_RIGA;

    domainEntity.DOC_ID = raw.DOC_ID;

    domainEntity.AZIENDA_ID = raw.AZIENDA_ID;

    domainEntity.linkOrpOrd = raw.linkOrpOrd?.map((it) => LinkOrpOrdMapper.toDomain(it));

    domainEntity.orpEffCicliEsec = raw.orpEffCicliEsec;

    domainEntity.epsNestjsOrpEffCicliEsec = raw.epsNestjsOrpEffCicliEsec;

    domainEntity.orpEff = raw.orpEff;

    return domainEntity;
  }

  static toPersistence(domainEntity: OrpEffCicli): OrpEffCicliEntity {
    const persistenceEntity = new OrpEffCicliEntity();
    persistenceEntity.DES_LAV = domainEntity.DES_LAV;

    persistenceEntity.DES_CICLO = domainEntity.DES_CICLO;

    persistenceEntity.DOC_RIGA_ID = domainEntity.DOC_RIGA_ID;

    persistenceEntity.NUM_RIGA = domainEntity.NUM_RIGA;

    persistenceEntity.DOC_ID = domainEntity.DOC_ID;

    persistenceEntity.AZIENDA_ID = domainEntity.AZIENDA_ID;

    return persistenceEntity;
  }
}
