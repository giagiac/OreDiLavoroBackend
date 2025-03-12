import { FilterDto } from '../../../utils/dto/filter-column';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ArtAna } from '../../domain/art-ana';
import { ArtAnaDto } from '../../dto/art-ana.dto';
import { SortArtAnaDto } from '../../dto/find-all-art-ana.dto';

export abstract class ArtAnaRepository {
  abstract create(
    data: Omit<ArtAna, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ArtAna>;

  abstract findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: Array<FilterDto<ArtAnaDto>> | null;
    sortOptions?: Array<SortArtAnaDto> | null;
    paginationOptions: IPaginationOptions;
  }): Promise<{ data: Array<ArtAna>; count: number }>;

  abstract findById(id: ArtAna['COD_ART']): Promise<NullableType<ArtAna>>;

  abstract findByIds(ids: ArtAna['COD_ART'][]): Promise<ArtAna[]>;

  abstract update(
    id: ArtAna['COD_ART'],
    payload: DeepPartial<ArtAna>,
  ): Promise<ArtAna | null>;

  abstract remove(id: ArtAna['COD_ART']): Promise<void>;
}
