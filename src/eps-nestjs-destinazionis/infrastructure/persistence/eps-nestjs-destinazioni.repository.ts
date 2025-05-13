import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { EpsNestjsDestinazioni } from '../../domain/eps-nestjs-destinazioni';

export abstract class EpsNestjsDestinazioniRepository {
  abstract create(data: Omit<EpsNestjsDestinazioni, 'id' | 'createdAt' | 'updatedAt'>): Promise<EpsNestjsDestinazioni>;

  abstract findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<EpsNestjsDestinazioni[]>;

  abstract findById(id: EpsNestjsDestinazioni['id']): Promise<NullableType<EpsNestjsDestinazioni>>;

  abstract findByIds(ids: EpsNestjsDestinazioni['id'][]): Promise<EpsNestjsDestinazioni[]>;

  abstract update(id: EpsNestjsDestinazioni['id'], payload: DeepPartial<EpsNestjsDestinazioni>): Promise<EpsNestjsDestinazioni | null>;

  abstract remove(id: EpsNestjsDestinazioni['id']): Promise<void>;
}
