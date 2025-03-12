import { ArtAna } from '../../../../domain/art-ana';
import { ArtAnaEntity } from '../entities/art-ana.entity';

export class ArtAnaMapper {
  static toDomain(raw: ArtAnaEntity): ArtAna {
    const domainEntity = new ArtAna();
    domainEntity.COD_ART = raw.COD_ART;
    domainEntity.DES_ART = raw.DES_ART;
    domainEntity.COD_CAT = raw.COD_CAT;

    return domainEntity;
  }

  static toPersistence(domainEntity: ArtAna): ArtAnaEntity {
    const persistenceEntity = new ArtAnaEntity();
    if (domainEntity.COD_ART) {
      persistenceEntity.COD_ART = domainEntity.COD_ART;
    }

    return persistenceEntity;
  }
}
