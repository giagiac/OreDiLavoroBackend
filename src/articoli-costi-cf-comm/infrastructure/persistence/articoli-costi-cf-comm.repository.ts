import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ArticoliCostiCfComm } from '../../domain/articoli-costi-cf-comm';

export abstract class ArticoliCostiCfCommRepository {
  // abstract create(
  //   data: Omit<ArticoliCosti, 'id' | 'createdAt' | 'updatedAt'>,
  // ): Promise<ArticoliCosti>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ArticoliCostiCfComm[]>;

  // abstract findById(
  //   id: ArticoliCosti['id'],
  // ): Promise<NullableType<ArticoliCosti>>;

  // abstract findByIds(ids: ArticoliCosti['id'][]): Promise<ArticoliCosti[]>;

  abstract update(
    CF_COMM_ID: ArticoliCostiCfComm['CF_COMM_ID'],
    payload: DeepPartial<ArticoliCostiCfComm>,
  ): Promise<ArticoliCostiCfComm | null>;

  // abstract remove(id: ArticoliCosti['id']): Promise<void>;
}
