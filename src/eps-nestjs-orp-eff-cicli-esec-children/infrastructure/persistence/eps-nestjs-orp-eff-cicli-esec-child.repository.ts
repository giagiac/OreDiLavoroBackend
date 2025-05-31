import { User } from '../../../users/domain/user';
import { FilterDto, SortDto } from '../../../utils/dto/filter-column';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { EpsNestjsOrpEffCicliEsecChild } from '../../domain/eps-nestjs-orp-eff-cicli-esec-child';
import { EpsNestjsOrpEffCicliEsecChildDto } from '../../dto/eps-nestjs-orp-eff-cicli-esec-child.dto';

export abstract class EpsNestjsOrpEffCicliEsecChildRepository {
  abstract create(data: Omit<EpsNestjsOrpEffCicliEsecChild, 'id' | 'createdAt' | 'updatedAt'>): Promise<EpsNestjsOrpEffCicliEsecChild>;

abstract findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    user,
  }: {
    filterOptions?: Array<FilterDto<EpsNestjsOrpEffCicliEsecChildDto>> | null;
    sortOptions?: Array<SortDto<EpsNestjsOrpEffCicliEsecChildDto>> | null;
    paginationOptions: IPaginationOptions;
    user: User | null;
  }): Promise<{
    data: {
      targetDateInizio: Date;
      totaleTempoOperatore: number;
      list: EpsNestjsOrpEffCicliEsecChild[];
    };
    count: number;
  }>;

  abstract findById(id: EpsNestjsOrpEffCicliEsecChild['id']): Promise<NullableType<EpsNestjsOrpEffCicliEsecChild>>;

  abstract findByIds(ids: EpsNestjsOrpEffCicliEsecChild['id'][]): Promise<EpsNestjsOrpEffCicliEsecChild[]>;

  abstract update(
    id: EpsNestjsOrpEffCicliEsecChild['id'],
    payload: DeepPartial<EpsNestjsOrpEffCicliEsecChild>,
  ): Promise<EpsNestjsOrpEffCicliEsecChild | null>;

  abstract remove(id: EpsNestjsOrpEffCicliEsecChild['id']): Promise<void>;
}
