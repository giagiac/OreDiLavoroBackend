import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrdCli } from '../../domain/ord-cli';

export abstract class OrdCliRepository {
  abstract create(data: Omit<OrdCli, 'DOC_ID'>): Promise<OrdCli>;

  abstract findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<OrdCli[]>;

  abstract findById(DOC_ID: OrdCli['DOC_ID']): Promise<NullableType<OrdCli>>;

  abstract findByIds(ids: OrdCli['DOC_ID'][]): Promise<OrdCli[]>;

  abstract update(DOC_ID: OrdCli['DOC_ID'], payload: DeepPartial<OrdCli>): Promise<OrdCli | null>;

  abstract remove(DOC_ID: OrdCli['DOC_ID']): Promise<void>;
}
