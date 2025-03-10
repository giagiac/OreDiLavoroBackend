import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { nsorpeffcicliesec } from '../../domain/nsorpeffcicliesec';

export abstract class nsorpeffcicliesecRepository {
  abstract create(
    data: Omit<nsorpeffcicliesec, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<nsorpeffcicliesec>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<nsorpeffcicliesec[]>;

  abstract findById(
    id: nsorpeffcicliesec['id'],
  ): Promise<NullableType<nsorpeffcicliesec>>;

  abstract findByIds(
    ids: nsorpeffcicliesec['id'][],
  ): Promise<nsorpeffcicliesec[]>;

  abstract update(
    id: nsorpeffcicliesec['id'],
    payload: DeepPartial<nsorpeffcicliesec>,
  ): Promise<nsorpeffcicliesec | null>;

  abstract remove(id: nsorpeffcicliesec['id']): Promise<void>;
}
