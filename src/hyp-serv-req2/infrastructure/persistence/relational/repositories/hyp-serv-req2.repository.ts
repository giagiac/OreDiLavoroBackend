import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { HypServReq2Entity } from '../entities/hyp-serv-req2.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { HypServReq2 } from '../../../../domain/hyp-serv-req2';
import { HypServReq2Repository } from '../../hyp-serv-req2.repository';
import { HypServReq2Mapper } from '../mappers/hyp-serv-req2.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class HypServReq2RelationalRepository implements HypServReq2Repository {
  constructor(
    @InjectRepository(HypServReq2Entity)
    private readonly hypServReq2Repository: Repository<HypServReq2Entity>,
  ) {}

  async create(data: HypServReq2): Promise<HypServReq2> {
    const persistenceModel = HypServReq2Mapper.toPersistence(data);
    const newEntity = await this.hypServReq2Repository.save(
      this.hypServReq2Repository.create(persistenceModel),
    );
    return HypServReq2Mapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<HypServReq2[]> {
    const entities = await this.hypServReq2Repository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => HypServReq2Mapper.toDomain(entity));
  }

  async findById(
    COD_CHIAVE: HypServReq2['COD_CHIAVE'],
  ): Promise<NullableType<HypServReq2>> {
    const entity = await this.hypServReq2Repository.findOne({
      where: { COD_CHIAVE: String(COD_CHIAVE) },
    });

    return entity ? HypServReq2Mapper.toDomain(entity) : null;
  }

  async findByIds(ids: HypServReq2['COD_CHIAVE'][]): Promise<HypServReq2[]> {
    const entities = await this.hypServReq2Repository.find({
      where: { COD_CHIAVE: In(ids) },
    });

    return entities.map((entity) => HypServReq2Mapper.toDomain(entity));
  }

  async update(
    COD_CHIAVE: HypServReq2['COD_CHIAVE'],
    payload: Partial<HypServReq2>,
  ): Promise<HypServReq2> {
    const entity = await this.hypServReq2Repository.findOne({
      where: { COD_CHIAVE: String(COD_CHIAVE) },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.hypServReq2Repository.save(
      this.hypServReq2Repository.create(
        HypServReq2Mapper.toPersistence({
          ...HypServReq2Mapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return HypServReq2Mapper.toDomain(updatedEntity);
  }

  async remove(COD_CHIAVE: HypServReq2['COD_CHIAVE']): Promise<void> {
    await this.hypServReq2Repository.delete(COD_CHIAVE);
  }
}
