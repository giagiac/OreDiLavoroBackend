import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { tipiCostiArt } from '../../../../domain/tipi-costi-art';
import { tipiCostiArtRepository } from '../../tipi-costi-art.repository';
import { tipiCostiArtEntity } from '../entities/tipi-costi-art.entity';
import { tipiCostiArtMapper } from '../mappers/tipi-costi-art.mapper';

@Injectable()
export class tipiCostiArtRelationalRepository
  implements tipiCostiArtRepository
{
  constructor(
    @InjectRepository(tipiCostiArtEntity)
    private readonly tipiCostiArtRepository: Repository<tipiCostiArtEntity>,
  ) {}

  async create(data: tipiCostiArt): Promise<tipiCostiArt> {
    const persistenceModel = tipiCostiArtMapper.toPersistence(data);
    const newEntity = await this.tipiCostiArtRepository.save(
      this.tipiCostiArtRepository.create(persistenceModel),
    );
    return tipiCostiArtMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<tipiCostiArt[]> {
    const entities = await this.tipiCostiArtRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => tipiCostiArtMapper.toDomain(entity));
  }

  async findById(
    id: tipiCostiArt['COD_TIPO_COST'],
  ): Promise<NullableType<tipiCostiArt>> {
    const entity = await this.tipiCostiArtRepository.findOne({
      where: { COD_TIPO_COST: id },
    });

    return entity ? tipiCostiArtMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: tipiCostiArt['COD_TIPO_COST'][],
  ): Promise<tipiCostiArt[]> {
    const entities = await this.tipiCostiArtRepository.find({
      where: { COD_TIPO_COST: In(ids) },
    });

    return entities.map((entity) => tipiCostiArtMapper.toDomain(entity));
  }

  async update(
    id: tipiCostiArt['COD_TIPO_COST'],
    payload: Partial<tipiCostiArt>,
  ): Promise<tipiCostiArt> {
    const entity = await this.tipiCostiArtRepository.findOne({
      where: { COD_TIPO_COST: id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.tipiCostiArtRepository.save(
      this.tipiCostiArtRepository.create(
        tipiCostiArtMapper.toPersistence({
          ...tipiCostiArtMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return tipiCostiArtMapper.toDomain(updatedEntity);
  }

  async remove(id: tipiCostiArt['COD_TIPO_COST']): Promise<void> {
    await this.tipiCostiArtRepository.delete(id);
  }
}
