import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrpEff } from '../../domain/orp-eff';

export abstract class OrpEffRepository {
  abstract create(data: Omit<OrpEff, 'DOC_ID' | 'createdAt' | 'updatedAt'>): Promise<OrpEff>;

  abstract findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<OrpEff[]>;

  abstract findById(DOC_ID: OrpEff['DOC_ID']): Promise<NullableType<OrpEff>>;

  abstract findByIds(ids: OrpEff['DOC_ID'][]): Promise<OrpEff[]>;

  abstract update(DOC_ID: OrpEff['DOC_ID'], payload: DeepPartial<OrpEff>): Promise<OrpEff | null>;

  abstract remove(DOC_ID: OrpEff['DOC_ID']): Promise<void>;
}
