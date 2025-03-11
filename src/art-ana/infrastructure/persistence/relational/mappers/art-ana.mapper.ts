import { art_ana } from '../../../../domain/art-ana';
import { art_anaEntity } from '../entities/art-ana.entity';

export class art_anaMapper {
  static toDomain(raw: art_anaEntity): art_ana {
    const domainEntity = new art_ana();
    domainEntity.COD_ART = raw.COD_ART;
    domainEntity.DES_ART = raw.DES_ART;
    domainEntity.COD_CAT = raw.COD_CAT;

    return domainEntity;
  }

  static toPersistence(domainEntity: art_ana): art_anaEntity {
    const persistenceEntity = new art_anaEntity();
    if (domainEntity.COD_ART) {
      persistenceEntity.COD_ART = domainEntity.COD_ART;
    }

    return persistenceEntity;
  }
}
