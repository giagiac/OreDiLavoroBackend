import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ArticoliCostiEntity } from '../entities/articoli-costi.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ArticoliCosti } from '../../../../domain/articoli-costi';
import { ArticoliCostiRepository } from '../../articoli-costi.repository';
import { ArticoliCostiMapper } from '../mappers/articoli-costi.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ArticoliCostiRelationalRepository
  implements ArticoliCostiRepository
{
  constructor(
    @InjectRepository(ArticoliCostiEntity)
    private readonly articoliCostiRepository: Repository<ArticoliCostiEntity>,
  ) {}

  // async create(data: ArticoliCosti): Promise<ArticoliCosti> {
  //   const persistenceModel = ArticoliCostiMapper.toPersistence(data);
  //   const newEntity = await this.articoliCostiRepository.save(
  //     this.articoliCostiRepository.create(persistenceModel),
  //   );
  //   return ArticoliCostiMapper.toDomain(newEntity);
  // }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ArticoliCosti[]> {
    const entities = await this.articoliCostiRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ArticoliCostiMapper.toDomain(entity));
  }

  async findById(
    id: ArticoliCosti['id'],
  ): Promise<NullableType<ArticoliCosti>> {
    const entity = await this.articoliCostiRepository.findOne({
      where: { id },
    });

    return entity ? ArticoliCostiMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ArticoliCosti['id'][]): Promise<ArticoliCosti[]> {
    const entities = await this.articoliCostiRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ArticoliCostiMapper.toDomain(entity));
  }

  async update(
    CF_COMM_ID: ArticoliCosti['CF_COMM_ID'],
    payload: ArticoliCosti,
  ): Promise<ArticoliCosti> {
    const entity = await this.articoliCostiRepository.findOne({
      where: { CF_COMM_ID },
    });

    if (!entity) {
      // throw new Error('Record not found');
      payload.CF_COMM_ID = CF_COMM_ID
      const persistenceModel = ArticoliCostiMapper.toPersistence(payload);
      const newEntity = await this.articoliCostiRepository.save(
        this.articoliCostiRepository.create(persistenceModel),
      );
      return ArticoliCostiMapper.toDomain(newEntity);
    }

    const updatedEntity = await this.articoliCostiRepository.save(
      this.articoliCostiRepository.create(
        ArticoliCostiMapper.toPersistence({
          ...ArticoliCostiMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ArticoliCostiMapper.toDomain(updatedEntity);
  }

  async remove(id: ArticoliCosti['id']): Promise<void> {
    await this.articoliCostiRepository.delete(id);
  }
}
