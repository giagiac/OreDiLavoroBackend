import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ArticoliCostiCfComm } from '../../../../domain/articoli-costi-cf-comm';
import { ArticoliCostiCfCommRepository } from '../../articoli-costi-cf-comm.repository';
import { ArticoliCostiCfCommEntity } from '../entities/articoli-costi-cf-comm.entity';
import { ArticoliCostiCfCommMapper } from '../mappers/articoli-costi-cf-comm.mapper';

@Injectable()
export class ArticoliCostiCfCommRelationalRepository
  implements ArticoliCostiCfCommRepository
{
  constructor(
    @InjectRepository(ArticoliCostiCfCommEntity)
    private readonly articoliCostiRepository: Repository<ArticoliCostiCfCommEntity>,
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
  }): Promise<ArticoliCostiCfComm[]> {
    const entities = await this.articoliCostiRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ArticoliCostiCfCommMapper.toDomain(entity));
  }

  async findById(
    id: ArticoliCostiCfComm['id'],
  ): Promise<NullableType<ArticoliCostiCfComm>> {
    const entity = await this.articoliCostiRepository.findOne({
      where: { id },
    });

    return entity ? ArticoliCostiCfCommMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: ArticoliCostiCfComm['id'][],
  ): Promise<ArticoliCostiCfComm[]> {
    const entities = await this.articoliCostiRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ArticoliCostiCfCommMapper.toDomain(entity));
  }

  async update(
    CF_COMM_ID: ArticoliCostiCfComm['CF_COMM_ID'],
    payload: ArticoliCostiCfComm,
  ): Promise<ArticoliCostiCfComm> {
    const entity = await this.articoliCostiRepository.findOne({
      where: { CF_COMM_ID },
    });

    if (!entity) {
      // throw new Error('Record not found');
      payload.CF_COMM_ID = CF_COMM_ID;
      const persistenceModel = ArticoliCostiCfCommMapper.toPersistence(payload);
      const newEntity = await this.articoliCostiRepository.save(
        this.articoliCostiRepository.create(persistenceModel),
      );
      return ArticoliCostiCfCommMapper.toDomain(newEntity);
    }

    const updatedEntity = await this.articoliCostiRepository.save(
      this.articoliCostiRepository.create(
        ArticoliCostiCfCommMapper.toPersistence({
          ...ArticoliCostiCfCommMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ArticoliCostiCfCommMapper.toDomain(updatedEntity);
  }

  async remove(id: ArticoliCostiCfComm['id']): Promise<void> {
    await this.articoliCostiRepository.delete(id);
  }
}
