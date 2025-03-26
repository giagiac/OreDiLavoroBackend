import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ArtCosti } from '../../domain/art-costi';

export abstract class artCostiRepository {
  abstract create(
    data: Omit<ArtCosti, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ArtCosti>;

  abstract findAllWithPagination({
    paginationOptions,
    COD_ART,
  }: {
    paginationOptions: IPaginationOptions;
    COD_ART: string;
  }): Promise<ArtCosti[]>;

  abstract findById(
    id: ArtCosti['COD_ART_TIPO_COST'],
  ): Promise<NullableType<ArtCosti>>;

  abstract findByIds(ids: ArtCosti['COD_ART_TIPO_COST'][]): Promise<ArtCosti[]>;

  abstract update(
    id: ArtCosti['COD_ART_TIPO_COST'],
    payload: DeepPartial<ArtCosti>,
  ): Promise<ArtCosti | null>;

  abstract remove(id: ArtCosti['COD_ART_TIPO_COST']): Promise<void>;
}
