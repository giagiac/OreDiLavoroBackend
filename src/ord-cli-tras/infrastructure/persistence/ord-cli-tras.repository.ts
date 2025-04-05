import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrdCliTras } from '../../domain/ord-cli-tras';

export abstract class OrdCliTrasRepository {
  abstract create(
    data: Omit<OrdCliTras, 'DOC_ID' | 'createdAt' | 'updatedAt'>,
  ): Promise<OrdCliTras>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrdCliTras[]>;

  abstract findById(
    DOC_ID: OrdCliTras['DOC_ID'],
  ): Promise<NullableType<OrdCliTras>>;

  abstract findByIds(ids: OrdCliTras['DOC_ID'][]): Promise<OrdCliTras[]>;

  abstract update(
    DOC_ID: OrdCliTras['DOC_ID'],
    payload: DeepPartial<OrdCliTras>,
  ): Promise<OrdCliTras | null>;

  abstract remove(DOC_ID: OrdCliTras['DOC_ID']): Promise<void>;
}
