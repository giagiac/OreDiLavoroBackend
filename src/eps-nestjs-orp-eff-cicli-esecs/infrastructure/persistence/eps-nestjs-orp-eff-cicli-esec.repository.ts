import { User } from '../../../users/domain/user';
import { FilterDto, SortDto } from '../../../utils/dto/filter-column';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { EpsNestjsOrpEffCicliEsec } from '../../domain/eps-nestjs-orp-eff-cicli-esec';
import { EpsNestjsOrpEffCicliEsecDto } from '../../dto/esp-nestjs-orp-eff-cicli-esec.dto';

export abstract class EpsNestjsOrpEffCicliEsecRepository {
  abstract create(data: Omit<EpsNestjsOrpEffCicliEsec, 'id' | 'createdAt' | 'updatedAt'>): Promise<EpsNestjsOrpEffCicliEsec>;

  abstract findAllWithPagination({
    filterOptions,
    sortOptions,
  }: {
    filterOptions?: Array<FilterDto<EpsNestjsOrpEffCicliEsecDto>> | null;
    sortOptions?: Array<SortDto<EpsNestjsOrpEffCicliEsecDto>> | null;
  }): Promise<{
    data: {
      targetDateInizio: Date;
      totaleTempoOperatore: number;
      list: EpsNestjsOrpEffCicliEsec[];
    };
  }>;

  abstract findById(id: EpsNestjsOrpEffCicliEsec['id'], user: User | null): Promise<NullableType<EpsNestjsOrpEffCicliEsec>>;

  abstract findByIds(ids: EpsNestjsOrpEffCicliEsec['id'][]): Promise<EpsNestjsOrpEffCicliEsec[]>;

  abstract update(
    id: EpsNestjsOrpEffCicliEsec['id'],
    payload: DeepPartial<EpsNestjsOrpEffCicliEsec>,
  ): Promise<EpsNestjsOrpEffCicliEsec | null>;

  abstract remove(id: EpsNestjsOrpEffCicliEsec['id']): Promise<void>;
}
