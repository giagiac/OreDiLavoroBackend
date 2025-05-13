import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { X1TrasCodici } from '../../domain/x1-tras-codici';

export abstract class X1TrasCodiciRepository {
  abstract create(data: Omit<X1TrasCodici, 'CODICE1' | 'createdAt' | 'updatedAt'>): Promise<X1TrasCodici>;

  abstract findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<X1TrasCodici[]>;

  abstract findById(CODICE1: X1TrasCodici['CODICE1']): Promise<NullableType<X1TrasCodici>>;

  abstract findByIds(ids: X1TrasCodici['CODICE1'][]): Promise<X1TrasCodici[]>;

  abstract update(CODICE1: X1TrasCodici['CODICE1'], payload: DeepPartial<X1TrasCodici>): Promise<X1TrasCodici | null>;

  abstract remove(CODICE1: X1TrasCodici['CODICE1']): Promise<void>;
}
