import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrdCliRighe } from '../../domain/ord-cli-righe';

export abstract class OrdCliRigheRepository {
  abstract create(data: Omit<OrdCliRighe, 'DOC_RIGA_ID' | 'createdAt' | 'updatedAt'>): Promise<OrdCliRighe>;

  abstract findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<OrdCliRighe[]>;

  abstract findById(DOC_RIGA_ID: OrdCliRighe['DOC_RIGA_ID']): Promise<NullableType<OrdCliRighe>>;

  abstract findByIds(ids: OrdCliRighe['DOC_RIGA_ID'][]): Promise<OrdCliRighe[]>;

  abstract update(DOC_RIGA_ID: OrdCliRighe['DOC_RIGA_ID'], payload: DeepPartial<OrdCliRighe>): Promise<OrdCliRighe | null>;

  abstract remove(DOC_RIGA_ID: OrdCliRighe['DOC_RIGA_ID']): Promise<void>;
}
