import { EpsNestjsOrpEffCicliEsecsModule } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/eps-nestjs-orp-eff-cicli-esecs.module';
import { EpsNestjsOrpEffCicliEsecMapper } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/mappers/eps-nestjs-orp-eff-cicli-esec.mapper';
import { Operatori } from '../../../../domain/operatori';
import { OperatoriEntity } from '../entities/operatori.entity';

export class OperatoriMapper {
  static toDomain(raw: OperatoriEntity): Operatori {
    const domainEntity = new Operatori();
    domainEntity.COD_OP = raw.COD_OP;
    domainEntity.AZIENDA_ID = raw.AZIENDA_ID;
    domainEntity.NOME_OP = raw.NOME_OP;
    domainEntity.UTENTE = raw.UTENTE;
    domainEntity.X_COD_BADGE = raw.X_COD_BADGE;
    domainEntity.COD_PALMARE = raw.COD_PALMARE;

    if (raw.epsNestjsOrpEffCicliEsec != null) {
      domainEntity.epsNestjsOrpEffCicliEsec = raw.epsNestjsOrpEffCicliEsec.map(
        (it) => EpsNestjsOrpEffCicliEsecMapper.toDomain(it),
      );
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: Operatori): OperatoriEntity {
    const persistenceEntity = new OperatoriEntity();
    // if (domainEntity.id) {
    //   persistenceEntity.id = domainEntity.id;
    // }
    // persistenceEntity.createdAt = domainEntity.createdAt;
    // persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
