import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { art_ana } from '../../domain/art-ana';

export abstract class art_anaRepository {
  abstract create(
    data: Omit<art_ana, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<art_ana>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<art_ana[]>;

  abstract findById(id: art_ana['COD_ART']): Promise<NullableType<art_ana>>;

  abstract findByIds(ids: art_ana['COD_ART'][]): Promise<art_ana[]>;

  abstract update(
    id: art_ana['COD_ART'],
    payload: DeepPartial<art_ana>,
  ): Promise<art_ana | null>;

  abstract remove(id: art_ana['COD_ART']): Promise<void>;
}
