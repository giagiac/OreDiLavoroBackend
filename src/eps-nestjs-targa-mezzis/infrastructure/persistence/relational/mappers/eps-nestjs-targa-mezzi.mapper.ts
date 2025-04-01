import { EpsNestjsTargaMezzi } from '../../../../domain/eps-nestjs-targa-mezzi';

import { EpsNestjsTargaMezziEntity } from '../entities/eps-nestjs-targa-mezzi.entity';

export class EpsNestjsTargaMezziMapper {
  static toDomain(raw: EpsNestjsTargaMezziEntity): EpsNestjsTargaMezzi {
    const domainEntity = new EpsNestjsTargaMezzi();
    domainEntity.COD_ART = raw.COD_ART;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    if(raw.artAna){
      domainEntity.artAna = raw.artAna
    }


    return domainEntity;
  }

  static toPersistence(
    domainEntity: EpsNestjsTargaMezzi,
  ): EpsNestjsTargaMezziEntity {
    const persistenceEntity = new EpsNestjsTargaMezziEntity();
    persistenceEntity.COD_ART = domainEntity.COD_ART;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
