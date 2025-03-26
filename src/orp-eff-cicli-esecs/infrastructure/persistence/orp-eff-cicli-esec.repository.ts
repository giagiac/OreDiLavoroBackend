import { FilterDto, SortDto } from '../../../utils/dto/filter-column';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrpEffCicliEsec } from '../../domain/orp-eff-cicli-esec';

export abstract class OrpEffCicliEsecRepository {
  abstract create(
    data: Omit<OrpEffCicliEsec, 'DOC_RIGA_ESEC_ID' | 'createdAt' | 'updatedAt'>,
  ): Promise<OrpEffCicliEsec>;

  abstract findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join,
  }: {
    filterOptions?: Array<FilterDto<OrpEffCicliEsec>> | null;
    sortOptions?: Array<SortDto<OrpEffCicliEsec>> | null;
    paginationOptions: IPaginationOptions;
    join: boolean;
  }): Promise<{
    orpEffCicliEsec: Array<OrpEffCicliEsec>;
    count: number;
  }>;

  abstract findById(
    DOC_RIGA_ESEC_ID: OrpEffCicliEsec['DOC_RIGA_ESEC_ID'],
  ): Promise<NullableType<OrpEffCicliEsec>>;

  abstract findByIds(
    ids: OrpEffCicliEsec['DOC_RIGA_ESEC_ID'][],
  ): Promise<OrpEffCicliEsec[]>;

  abstract update(
    DOC_RIGA_ESEC_ID: OrpEffCicliEsec['DOC_RIGA_ESEC_ID'],
    payload: DeepPartial<OrpEffCicliEsec>,
  ): Promise<OrpEffCicliEsec | null>;

  abstract remove(
    DOC_RIGA_ESEC_ID: OrpEffCicliEsec['DOC_RIGA_ESEC_ID'],
  ): Promise<void>;
}
