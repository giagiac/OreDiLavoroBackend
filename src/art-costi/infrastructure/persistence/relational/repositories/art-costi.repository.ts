import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ArtCosti } from '../../../../domain/art-costi';
import { artCostiRepository } from '../../art-costi.repository';
import { ArtCostiEntity } from '../entities/art-costi.entity';
import { artCostiMapper } from '../mappers/art-costi.mapper';

@Injectable()
export class artCostiRelationalRepository implements artCostiRepository {
  constructor(
    @InjectRepository(ArtCostiEntity)
    private readonly artCostiRepository: Repository<ArtCostiEntity>,
  ) {}

  async create(data: ArtCosti): Promise<ArtCosti> {
    const persistenceModel = artCostiMapper.toPersistence(data);
    const newEntity = await this.artCostiRepository.save(this.artCostiRepository.create(persistenceModel));
    return artCostiMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    COD_ART,
  }: {
    paginationOptions: IPaginationOptions;
    COD_ART: string;
  }): Promise<ArtCosti[]> {
    const entities = await this.artCostiRepository.find({
      where: {
        COD_ART: Like(`${COD_ART}%`),
      },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => artCostiMapper.toDomain(entity));
  }

  async findById(COD_ART_TIPO_COST: ArtCosti['COD_ART_TIPO_COST']): Promise<NullableType<ArtCosti>> {
    const entity = await this.artCostiRepository.findOne({
      where: { COD_ART_TIPO_COST },
    });

    return entity ? artCostiMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ArtCosti['COD_ART_TIPO_COST'][]): Promise<ArtCosti[]> {
    const entities = await this.artCostiRepository.find({
      where: { COD_ART_TIPO_COST: In(ids) },
    });

    return entities.map((entity) => artCostiMapper.toDomain(entity));
  }

  async update(COD_ART_TIPO_COST: ArtCosti['COD_ART_TIPO_COST'], payload: Partial<ArtCosti>): Promise<ArtCosti> {
    const entity = await this.artCostiRepository.findOne({
      where: { COD_ART_TIPO_COST },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.artCostiRepository.save(
      this.artCostiRepository.create(
        artCostiMapper.toPersistence({
          ...artCostiMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return artCostiMapper.toDomain(updatedEntity);
  }

  async remove(id: ArtCosti['COD_ART_TIPO_COST']): Promise<void> {
    await this.artCostiRepository.delete(id);
  }
}
