import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { tipiCostiArt } from '../../domain/tipi-costi-art';

export abstract class tipiCostiArtRepository {
  abstract create(data: Omit<tipiCostiArt, 'id' | 'createdAt' | 'updatedAt'>): Promise<tipiCostiArt>;

  abstract findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<tipiCostiArt[]>;

  abstract findById(id: tipiCostiArt['COD_TIPO_COST']): Promise<NullableType<tipiCostiArt>>;

  abstract findByIds(ids: tipiCostiArt['COD_TIPO_COST'][]): Promise<tipiCostiArt[]>;

  abstract update(id: tipiCostiArt['COD_TIPO_COST'], payload: DeepPartial<tipiCostiArt>): Promise<tipiCostiArt | null>;

  abstract remove(id: tipiCostiArt['COD_TIPO_COST']): Promise<void>;
}
