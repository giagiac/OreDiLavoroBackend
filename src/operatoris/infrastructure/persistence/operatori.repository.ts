import { FilterDto, SortDto } from '../../../utils/dto/filter-column';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Operatori } from '../../domain/operatori';
import { OperatoriDto } from '../../dto/operatori.dto';

export abstract class OperatoriRepository {
  abstract create(
    data: Omit<Operatori, 'COD_OP' | 'createdAt' | 'updatedAt'>,
  ): Promise<Operatori>;

  abstract findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join,
  }: {
    filterOptions?: Array<FilterDto<OperatoriDto>> | null;
    sortOptions?: Array<SortDto<OperatoriDto>> | null;
    paginationOptions: IPaginationOptions;
    join: boolean;
  }): Promise<{ operatori: Array<Operatori>; count: number }>;

  abstract findById(
    COD_OP: Operatori['COD_OP'],
  ): Promise<NullableType<Operatori>>;

  abstract findByIds(ids: Operatori['COD_OP'][]): Promise<Operatori[]>;

  abstract update(
    COD_OP: Operatori['COD_OP'],
    payload: DeepPartial<Operatori>,
  ): Promise<Operatori | null>;

  abstract remove(COD_OP: Operatori['COD_OP']): Promise<void>;
}
