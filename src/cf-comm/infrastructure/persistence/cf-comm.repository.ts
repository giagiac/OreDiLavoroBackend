import { FilterDto } from '../../../utils/dto/filter-column';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { CfComm } from '../../domain/cf-comm';
import { CfCommDto } from '../../dto/cf-comm.dto';
import { SortCfCommDto } from '../../dto/find-all-cf-comm.dto';

export abstract class CfCommRepository {
  abstract create(
    data: Omit<CfComm, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CfComm>;

  abstract findById(id: CfComm['COD_CF']): Promise<NullableType<CfComm>>;

  abstract findByIds(ids: CfComm['COD_CF'][]): Promise<CfComm[]>;

  abstract findByCodCf(COD_CF: CfComm['COD_CF']): Promise<CfComm[]>;

  abstract findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: Array<FilterDto<CfCommDto>> | null;
    sortOptions?: Array<SortCfCommDto> | null;
    paginationOptions: IPaginationOptions;
  }): Promise<{ cf: Array<CfComm>; count: number }>;

  abstract update(
    id: CfComm['COD_CF'],
    payload: DeepPartial<CfComm>,
  ): Promise<CfComm | null>;

  abstract remove(id: CfComm['COD_CF']): Promise<void>;
}
