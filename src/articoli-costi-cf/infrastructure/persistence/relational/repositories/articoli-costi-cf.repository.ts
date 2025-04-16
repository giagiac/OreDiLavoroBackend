import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ArticoliCostiCf } from '../../../../domain/articoli-costi-cf';
import { ArticoliCostiCfRepository } from '../../articoli-costi-cf.repository';
import { ArticoliCostiCfEntity } from '../entities/articoli-costi-cf.entity';
import { ArticoliCostiCfMapper } from '../mappers/articoli-costi-cf.mapper';

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

  async update(payload: ArticoliCostiCf): Promise<ArticoliCostiCf | null> {
    await this.articoliCostiCfRepository.manager.transaction(async () => {
      const entity: ArticoliCostiCfEntity | null =
        await this.articoliCostiCfRepository.findOne({
          where: { COD_CF: payload.COD_CF, TIPO_COSTO: payload.TIPO_COSTO },
        });

      if (entity) {
        payload = {
          ...entity,
          ...payload,
        };
      }

      const persistenceModel = ArticoliCostiCfMapper.toPersistence(payload);

      const newEntity = await this.articoliCostiCfRepository.save(
        this.articoliCostiCfRepository.create(persistenceModel),
      );

      return newEntity;
    });

    //return ArticoliCostiCfMapper.toDomain(result);
    const entity: ArticoliCostiCfEntity | null =
      await this.articoliCostiCfRepository
        .createQueryBuilder('articoliCostiCf')
        .leftJoinAndSelect('articoliCostiCf.artAna', 'artAna') // Assumi che la relazione sia "artAna"
        .leftJoinAndSelect('artAna.artCosti', 'artCosti')
        .where('articoliCostiCf.COD_CF = :COD_CF', { COD_CF: payload.COD_CF })
        .andWhere('articoliCostiCf.TIPO_COSTO = :TIPO_COSTO', {
          TIPO_COSTO: payload.TIPO_COSTO,
        })
        .getOne();

    if (entity) {
      return ArticoliCostiCfMapper.toDomain(entity);
    }
    return null;
  }

  async remove(id: ArticoliCostiCf['id']): Promise<void> {
    await this.articoliCostiCfRepository.delete(id);
  }
}
