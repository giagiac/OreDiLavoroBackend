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
    private readonly articoliCostiCfCommRepository: Repository<ArticoliCostiCfCommEntity>,
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
    const entities = await this.articoliCostiCfCommRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ArticoliCostiCfCommMapper.toDomain(entity));
  }

  async findById(
    id: ArticoliCostiCfComm['id'],
  ): Promise<NullableType<ArticoliCostiCfComm>> {
    const entity = await this.articoliCostiCfCommRepository.findOne({
      where: { id },
    });

    return entity ? ArticoliCostiCfCommMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: ArticoliCostiCfComm['id'][],
  ): Promise<ArticoliCostiCfComm[]> {
    const entities = await this.articoliCostiCfCommRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ArticoliCostiCfCommMapper.toDomain(entity));
  }

  async update(
    CF_COMM_ID: ArticoliCostiCfComm['CF_COMM_ID'],
    payload: ArticoliCostiCfComm,
  ): Promise<ArticoliCostiCfComm | null> {
    const result = await this.articoliCostiCfCommRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const entity: ArticoliCostiCfCommEntity | null =
          await this.articoliCostiCfCommRepository.findOne({
            where: { CF_COMM_ID, TIPO_COSTO: payload.TIPO_COSTO },
          });

        // const entity: ArticoliCostiCfCommEntity | null =
        //   await this.articoliCostiCfCommRepository
        //     .createQueryBuilder('articoliCostiCfComm')
        //     //.leftJoinAndSelect('articoliCostiCfComm.artAna', 'artAna') // Assumi che la relazione sia "artAna"
        //     //.leftJoinAndSelect('artAna.artCosti', 'artCosti')
        //     .where('articoliCostiCfComm.CF_COMM_ID = :CF_COMM_ID', { CF_COMM_ID })
        //     .andWhere('articoliCostiCfComm.TIPO_COSTO = :TIPO_COSTO', {
        //       TIPO_COSTO: payload.TIPO_COSTO,
        //     })
        //     .getOne();

        if (entity) {
          payload = {
            ...entity,
            ...payload,
          };
        }

        const persistenceModel =
          ArticoliCostiCfCommMapper.toPersistence(payload);

        const newEntity = await this.articoliCostiCfCommRepository.save(
          this.articoliCostiCfCommRepository.create(persistenceModel),
        );
        return newEntity;
      },
    );

    const entity: ArticoliCostiCfCommEntity | null =
      await this.articoliCostiCfCommRepository
        .createQueryBuilder('articoliCostiCfComm')
        .leftJoinAndSelect('articoliCostiCfComm.artAna', 'artAna') // Assumi che la relazione sia "artAna"
        .leftJoinAndSelect('artAna.artCosti', 'artCosti')
        .where('articoliCostiCfComm.CF_COMM_ID = :CF_COMM_ID', { CF_COMM_ID })
        .andWhere('articoliCostiCfComm.TIPO_COSTO = :TIPO_COSTO', {
          TIPO_COSTO: payload.TIPO_COSTO,
        })
        .getOne();

    if (entity) {
      return ArticoliCostiCfCommMapper.toDomain(entity);
    }
    return null;
  }

  async remove(CF_COMM_ID: ArticoliCostiCfComm['CF_COMM_ID']): Promise<void> {
    await this.articoliCostiCfCommRepository.delete(CF_COMM_ID);
  }
}
