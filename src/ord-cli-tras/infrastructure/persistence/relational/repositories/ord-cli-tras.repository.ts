import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { OrdCliTrasEntity } from '../entities/ord-cli-tras.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { OrdCliTras } from '../../../../domain/ord-cli-tras';
import { OrdCliTrasRepository } from '../../ord-cli-tras.repository';
import { OrdCliTrasMapper } from '../mappers/ord-cli-tras.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class OrdCliTrasRelationalRepository implements OrdCliTrasRepository {
  constructor(
    @InjectRepository(OrdCliTrasEntity)
    private readonly ordCliTrasRepository: Repository<OrdCliTrasEntity>,
  ) {}

  async create(data: OrdCliTras): Promise<OrdCliTras> {
    const persistenceModel = OrdCliTrasMapper.toPersistence(data);
    const newEntity = await this.ordCliTrasRepository.save(
      this.ordCliTrasRepository.create(persistenceModel),
    );
    return OrdCliTrasMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrdCliTras[]> {
    const entities = await this.ordCliTrasRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => OrdCliTrasMapper.toDomain(entity));
  }

  async findById(
    DOC_ID: OrdCliTras['DOC_ID'],
  ): Promise<NullableType<OrdCliTras>> {
    const entity = await this.ordCliTrasRepository.findOne({
      where: { DOC_ID },
    });

    return entity ? OrdCliTrasMapper.toDomain(entity) : null;
  }

  async findByIds(ids: OrdCliTras['DOC_ID'][]): Promise<OrdCliTras[]> {
    const entities = await this.ordCliTrasRepository.find({
      where: { DOC_ID: In(ids) },
    });

    return entities.map((entity) => OrdCliTrasMapper.toDomain(entity));
  }

  async update(
    DOC_ID: OrdCliTras['DOC_ID'],
    payload: Partial<OrdCliTras>,
  ): Promise<OrdCliTras> {
    const entity = await this.ordCliTrasRepository.findOne({
      where: { DOC_ID },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.ordCliTrasRepository.save(
      this.ordCliTrasRepository.create(
        OrdCliTrasMapper.toPersistence({
          ...OrdCliTrasMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrdCliTrasMapper.toDomain(updatedEntity);
  }

  async remove(DOC_ID: OrdCliTras['DOC_ID']): Promise<void> {
    await this.ordCliTrasRepository.delete(DOC_ID);
  }
}
