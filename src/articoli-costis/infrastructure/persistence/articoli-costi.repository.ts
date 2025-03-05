import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ArticoliCosti } from '../../domain/articoli-costi';

export abstract class ArticoliCostiRepository {
  // abstract create(
  //   data: Omit<ArticoliCosti, 'id' | 'createdAt' | 'updatedAt'>,
  // ): Promise<ArticoliCosti>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ArticoliCosti[]>;

  // abstract findById(
  //   id: ArticoliCosti['id'],
  // ): Promise<NullableType<ArticoliCosti>>;

  // abstract findByIds(ids: ArticoliCosti['id'][]): Promise<ArticoliCosti[]>;

  abstract update(
    CF_COMM_ID: ArticoliCosti['CF_COMM_ID'],
    payload: DeepPartial<ArticoliCosti>,
  ): Promise<ArticoliCosti | null>;

  // abstract remove(id: ArticoliCosti['id']): Promise<void>;
}
