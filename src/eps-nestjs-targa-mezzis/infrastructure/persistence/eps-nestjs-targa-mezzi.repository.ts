import { FilterDto, SortDto } from '../../../utils/dto/filter-column';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { EpsNestjsTargaMezzi } from '../../domain/eps-nestjs-targa-mezzi';
import { EpsNestjsTargaMezziDto } from '../../dto/eps-nestjs-targa-mezzi.dto';

export abstract class EpsNestjsTargaMezziRepository {
  abstract create(data: Omit<EpsNestjsTargaMezzi, 'artAna' | 'id' | 'createdAt' | 'updatedAt'>): Promise<EpsNestjsTargaMezzi>;

  abstract findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join,
  }: {
    filterOptions?: Array<FilterDto<EpsNestjsTargaMezziDto>> | null;
    sortOptions?: Array<SortDto<EpsNestjsTargaMezziDto>> | null;
    paginationOptions: IPaginationOptions;
    join: boolean;
  }): Promise<{
    epsNestjsTargaMezzi: Array<EpsNestjsTargaMezzi>;
    count: number;
  }>;

  abstract findById(id: EpsNestjsTargaMezzi['id']): Promise<NullableType<EpsNestjsTargaMezzi>>;

  abstract findByIds(ids: EpsNestjsTargaMezzi['id'][]): Promise<EpsNestjsTargaMezzi[]>;

  abstract update(id: EpsNestjsTargaMezzi['id'], payload: DeepPartial<EpsNestjsTargaMezzi>): Promise<EpsNestjsTargaMezzi | null>;

  abstract remove(id: EpsNestjsTargaMezzi['id']): Promise<void>;
}
