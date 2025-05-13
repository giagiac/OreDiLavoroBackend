import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { LinkOrpOrd } from '../../domain/link-orp-ord';

export abstract class LinkOrpOrdRepository {
  abstract create(data: Omit<LinkOrpOrd, 'linkOrpOrd' | 'ordCliRighe' | 'createdAt' | 'updatedAt'>): Promise<LinkOrpOrd>;

  abstract findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<LinkOrpOrd[]>;

  abstract findById(ORP_EFF_DOC_ID: LinkOrpOrd['ORP_EFF_DOC_ID']): Promise<NullableType<LinkOrpOrd>>;

  abstract findByIds(ids: LinkOrpOrd['ORP_EFF_DOC_ID'][]): Promise<LinkOrpOrd[]>;

  abstract update(ORP_EFF_DOC_ID: LinkOrpOrd['ORP_EFF_DOC_ID'], payload: DeepPartial<LinkOrpOrd>): Promise<LinkOrpOrd | null>;

  abstract remove(ORP_EFF_DOC_ID: LinkOrpOrd['ORP_EFF_DOC_ID']): Promise<void>;
}
