import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ArticoliCostiCf } from '../../domain/articoli-costi-cf';

export abstract class ArticoliCostiCfRepository {
  // abstract create(
  //   data: Omit<ArticoliCostiCf, 'id' | 'createdAt' | 'updatedAt'>,
  // ): Promise<ArticoliCostiCf>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ArticoliCostiCf[]>;

  // abstract findById(
  //   id: ArticoliCostiCf['id'],
  // ): Promise<NullableType<ArticoliCostiCf>>;

  // abstract findByIds(ids: ArticoliCostiCf['id'][]): Promise<ArticoliCostiCf[]>;

  abstract update(
    id: ArticoliCostiCf['id'],
    payload: DeepPartial<ArticoliCostiCf>,
  ): Promise<ArticoliCostiCf | null>;

  abstract remove(id: ArticoliCostiCf['id']): Promise<void>;
}
