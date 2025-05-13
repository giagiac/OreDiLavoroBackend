import { FilterDto, SortDto } from '../../../utils/dto/filter-column';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrpEffCicli } from '../../domain/orp-eff-cicli';

export abstract class OrpEffCicliRepository {
  abstract create(data: Omit<OrpEffCicli, 'DOC_RIGA_ID' | 'createdAt' | 'updatedAt'>): Promise<OrpEffCicli>;

  abstract findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join,
  }: {
    filterOptions?: Array<FilterDto<OrpEffCicli>> | null;
    sortOptions?: Array<SortDto<OrpEffCicli>> | null;
    paginationOptions: IPaginationOptions;
    join: boolean;
  }): Promise<{
    orpEffCicli: Array<OrpEffCicli>;
    count: number;
  }>;

  abstract findById(DOC_RIGA_ID: OrpEffCicli['DOC_RIGA_ID']): Promise<NullableType<OrpEffCicli>>;

  abstract findByIds(ids: OrpEffCicli['DOC_RIGA_ID'][]): Promise<OrpEffCicli[]>;

  abstract update(DOC_RIGA_ID: OrpEffCicli['DOC_RIGA_ID'], payload: DeepPartial<OrpEffCicli>): Promise<OrpEffCicli | null>;

  abstract remove(DOC_RIGA_ID: OrpEffCicli['DOC_RIGA_ID']): Promise<void>;
}
