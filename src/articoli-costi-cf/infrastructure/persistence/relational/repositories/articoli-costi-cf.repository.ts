import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ArticoliCostiCfEntity } from '../entities/articoli-costi-cf.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ArticoliCostiCf } from '../../../../domain/articoli-costi-cf';
import { ArticoliCostiCfRepository } from '../../articoli-costi-cf.repository';
import { ArticoliCostiCfMapper } from '../mappers/articoli-costi-cf.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ArticoliCostiCfRelationalRepository
  implements ArticoliCostiCfRepository
{
  constructor(
    @InjectRepository(ArticoliCostiCfEntity)
    private readonly articoliCostiCfRepository: Repository<ArticoliCostiCfEntity>,
  ) {}

  // async create(data: ArticoliCostiCf): Promise<ArticoliCostiCf> {
  //   const persistenceModel = ArticoliCostiCfMapper.toPersistence(data);
  //   const newEntity = await this.articoliCostiCfRepository.save(
  //     this.articoliCostiCfRepository.create(persistenceModel),
  //   );
  //   return ArticoliCostiCfMapper.toDomain(newEntity);
  // }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ArticoliCostiCf[]> {
    const entities = await this.articoliCostiCfRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ArticoliCostiCfMapper.toDomain(entity));
  }

  async findById(
    id: ArticoliCostiCf['id'],
  ): Promise<NullableType<ArticoliCostiCf>> {
    const entity = await this.articoliCostiCfRepository.findOne({
      where: { id },
    });

    return entity ? ArticoliCostiCfMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ArticoliCostiCf['id'][]): Promise<ArticoliCostiCf[]> {
    const entities = await this.articoliCostiCfRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ArticoliCostiCfMapper.toDomain(entity));
  }

  async update(
    COD_CF: ArticoliCostiCf['COD_CF'],
    payload: ArticoliCostiCf,
  ): Promise<ArticoliCostiCf> {
    const result = await this.articoliCostiCfRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const entity: ArticoliCostiCfEntity | null =
          await this.articoliCostiCfRepository.findOne({
            where: { COD_CF, TIPO_COSTO: payload.TIPO_COSTO },
    });

        if (entity) {
          payload = {
            ...entity,
            ...payload
          };
        }

        const persistenceModel =
          ArticoliCostiCfMapper.toPersistence(payload);

        const newEntity = await this.articoliCostiCfRepository.save(
          this.articoliCostiCfRepository.create(persistenceModel),
        );

        return newEntity;
      },
    );

    return ArticoliCostiCfMapper.toDomain(result);
  }

  async remove(id: ArticoliCostiCf['id']): Promise<void> {
    await this.articoliCostiCfRepository.delete(id);
  }
}
