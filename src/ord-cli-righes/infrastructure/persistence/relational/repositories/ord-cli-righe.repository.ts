import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { OrdCliRigheEntity } from '../entities/ord-cli-righe.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { OrdCliRighe } from '../../../../domain/ord-cli-righe';
import { OrdCliRigheRepository } from '../../ord-cli-righe.repository';
import { OrdCliRigheMapper } from '../mappers/ord-cli-righe.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class OrdCliRigheRelationalRepository implements OrdCliRigheRepository {
  constructor(
    @InjectRepository(OrdCliRigheEntity)
    private readonly ordCliRigheRepository: Repository<OrdCliRigheEntity>,
  ) {}

  async create(data: OrdCliRighe): Promise<OrdCliRighe> {
    const persistenceModel = OrdCliRigheMapper.toPersistence(data);
    const newEntity = await this.ordCliRigheRepository.save(
      this.ordCliRigheRepository.create(persistenceModel),
    );
    return OrdCliRigheMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrdCliRighe[]> {
    const entities = await this.ordCliRigheRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => OrdCliRigheMapper.toDomain(entity));
  }

  async findById(
    DOC_RIGA_ID: OrdCliRighe['DOC_RIGA_ID'],
  ): Promise<NullableType<OrdCliRighe>> {
    const entity = await this.ordCliRigheRepository.findOne({
      where: { DOC_RIGA_ID },
    });

    return entity ? OrdCliRigheMapper.toDomain(entity) : null;
  }

  async findByIds(ids: OrdCliRighe['DOC_RIGA_ID'][]): Promise<OrdCliRighe[]> {
    const entities = await this.ordCliRigheRepository.find({
      where: { DOC_RIGA_ID: In(ids) },
    });

    return entities.map((entity) => OrdCliRigheMapper.toDomain(entity));
  }

  async update(
    DOC_RIGA_ID: OrdCliRighe['DOC_RIGA_ID'],
    payload: Partial<OrdCliRighe>,
  ): Promise<OrdCliRighe> {
    const entity = await this.ordCliRigheRepository.findOne({
      where: { DOC_RIGA_ID },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.ordCliRigheRepository.save(
      this.ordCliRigheRepository.create(
        OrdCliRigheMapper.toPersistence({
          ...OrdCliRigheMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrdCliRigheMapper.toDomain(updatedEntity);
  }

  async remove(DOC_RIGA_ID: OrdCliRighe['DOC_RIGA_ID']): Promise<void> {
    await this.ordCliRigheRepository.delete(DOC_RIGA_ID);
  }
}
