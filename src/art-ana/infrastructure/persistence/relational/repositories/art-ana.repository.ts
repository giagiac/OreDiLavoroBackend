import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { art_ana } from '../../../../domain/art-ana';
import { art_anaRepository } from '../../art-ana.repository';
import { art_anaEntity } from '../entities/art-ana.entity';
import { art_anaMapper } from '../mappers/art-ana.mapper';

@Injectable()
export class art_anaRelationalRepository implements art_anaRepository {
  constructor(
    @InjectRepository(art_anaEntity)
    private readonly artAnaRepository: Repository<art_anaEntity>,
  ) {}

  async create(data: art_ana): Promise<art_ana> {
    const persistenceModel = art_anaMapper.toPersistence(data);
    const newEntity = await this.artAnaRepository.save(
      this.artAnaRepository.create(persistenceModel),
    );
    return art_anaMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<art_ana[]> {
    const entities = await this.artAnaRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => art_anaMapper.toDomain(entity));
  }

  async findById(id: art_ana['COD_ART']): Promise<NullableType<art_ana>> {
    const entity = await this.artAnaRepository.findOne({
      where: { COD_ART: id },
    });

    return entity ? art_anaMapper.toDomain(entity) : null;
  }

  async findByIds(ids: art_ana['COD_ART'][]): Promise<art_ana[]> {
    const entities = await this.artAnaRepository.find({
      where: { COD_ART: In(ids) },
    });

    return entities.map((entity) => art_anaMapper.toDomain(entity));
  }

  async update(
    id: art_ana['COD_ART'],
    payload: Partial<art_ana>,
  ): Promise<art_ana> {
    const entity = await this.artAnaRepository.findOne({
      where: { COD_ART: id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.artAnaRepository.save(
      this.artAnaRepository.create(
        art_anaMapper.toPersistence({
          ...art_anaMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return art_anaMapper.toDomain(updatedEntity);
  }

  async remove(id: art_ana['COD_ART']): Promise<void> {
    await this.artAnaRepository.delete(id);
  }
}
