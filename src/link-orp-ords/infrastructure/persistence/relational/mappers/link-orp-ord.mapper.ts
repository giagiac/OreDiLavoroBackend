import { OrdCliRigheMapper } from '../../../../../ord-cli-righes/infrastructure/persistence/relational/mappers/ord-cli-righe.mapper';
import { OrdCliTrasMapper } from '../../../../../ord-cli-tras/infrastructure/persistence/relational/mappers/ord-cli-tras.mapper';
import { LinkOrpOrd } from '../../../../domain/link-orp-ord';
import { LinkOrpOrdEntity } from '../entities/link-orp-ord.entity';

export class LinkOrpOrdMapper {
  static toDomain(raw: LinkOrpOrdEntity): LinkOrpOrd {
    const domainEntity = new LinkOrpOrd();

    if (raw.ordCliRighe) {
      domainEntity.ordCliRighe = OrdCliRigheMapper.toDomain(raw.ordCliRighe);
    }

    domainEntity.ORP_EFF_DOC_ID = raw.ORP_EFF_DOC_ID;
    domainEntity.ORD_CLI_DOC_RIGA_ID = raw.ORD_CLI_DOC_RIGA_ID;
    domainEntity.LINK_ORP_ORD_ID = raw.LINK_ORP_ORD_ID;

    return domainEntity;
  }

  static toPersistence(domainEntity: LinkOrpOrd): LinkOrpOrdEntity {
    const persistenceEntity = new LinkOrpOrdEntity();
    if (domainEntity.ordCliRighe) {
      persistenceEntity.ordCliRighe = OrdCliRigheMapper.toPersistence(domainEntity.ordCliRighe);
    } else if (domainEntity.ordCliRighe === null) {
      persistenceEntity.ordCliRighe = null;
    }

    // if (domainEntity.linkOrpOrd) {
    //   persistenceEntity.orpEffCicli = OrpEffCicliMapper.toPersistence(
    //     domainEntity.linkOrpOrd,
    //   );
    // }

    persistenceEntity.ORP_EFF_DOC_ID = domainEntity.ORP_EFF_DOC_ID;

    return persistenceEntity;
  }
}
