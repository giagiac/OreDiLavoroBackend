import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { nsorpeffcicliesec } from '../../../../domain/nsorpeffcicliesec';
import { nsorpeffcicliesecRepository } from '../../nsorpeffcicliesec.repository';
import { nsorpeffcicliesecEntity } from '../entities/nsorpeffcicliesec.entity';
import { nsorpeffcicliesecMapper } from '../mappers/nsorpeffcicliesec.mapper';

@Injectable()
export class nsorpeffcicliesecRelationalRepository
  implements nsorpeffcicliesecRepository
{
  constructor(
    @InjectRepository(nsorpeffcicliesecEntity)
    private readonly nsorpeffcicliesecRepository: Repository<nsorpeffcicliesecEntity>,
  ) {}

  async create(data: nsorpeffcicliesec): Promise<nsorpeffcicliesec> {
    const persistenceModel = nsorpeffcicliesecMapper.toPersistence(data);
    const newEntity = await this.nsorpeffcicliesecRepository.save(
      this.nsorpeffcicliesecRepository.create(persistenceModel),
    );
    return nsorpeffcicliesecMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<nsorpeffcicliesec[]> {
    const entities = await this.nsorpeffcicliesecRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => nsorpeffcicliesecMapper.toDomain(entity));
  }

  async findById(
    id: nsorpeffcicliesec['id'],
  ): Promise<NullableType<nsorpeffcicliesec>> {
    const entity = await this.nsorpeffcicliesecRepository.findOne({
      where: { id },
    });

    return entity ? nsorpeffcicliesecMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: nsorpeffcicliesec['id'][],
  ): Promise<nsorpeffcicliesec[]> {
    const entities = await this.nsorpeffcicliesecRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => nsorpeffcicliesecMapper.toDomain(entity));
  }

  async update(
    id: nsorpeffcicliesec['id'],
    payload: Partial<nsorpeffcicliesec>,
  ): Promise<nsorpeffcicliesec> {
    const entity = await this.nsorpeffcicliesecRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.nsorpeffcicliesecRepository.save(
      this.nsorpeffcicliesecRepository.create(
        nsorpeffcicliesecMapper.toPersistence({
          ...nsorpeffcicliesecMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return nsorpeffcicliesecMapper.toDomain(updatedEntity);
  }

  async remove(id: nsorpeffcicliesec['id']): Promise<void> {
    await this.nsorpeffcicliesecRepository.delete(id);
  }
}
