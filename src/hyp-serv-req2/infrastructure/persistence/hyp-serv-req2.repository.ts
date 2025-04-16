import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { HypServReq2 } from '../../domain/hyp-serv-req2';

export abstract class HypServReq2Repository {
  abstract create(
    data: Omit<HypServReq2, 'COD_CHIAVE' | 'createdAt' | 'updatedAt'>,
  ): Promise<HypServReq2>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<HypServReq2[]>;

  abstract findById(
    COD_CHIAVE: HypServReq2['COD_CHIAVE'],
  ): Promise<NullableType<HypServReq2>>;

  abstract findByIds(ids: HypServReq2['COD_CHIAVE'][]): Promise<HypServReq2[]>;

  abstract update(
    COD_CHIAVE: HypServReq2['COD_CHIAVE'],
    payload: DeepPartial<HypServReq2>,
  ): Promise<HypServReq2 | null>;

  abstract remove(COD_CHIAVE: HypServReq2['COD_CHIAVE']): Promise<void>;
}
