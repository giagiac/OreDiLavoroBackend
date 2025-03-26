import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { OrpEffEntity } from '../entities/orp-eff.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { OrpEff } from '../../../../domain/orp-eff';
import { OrpEffRepository } from '../../orp-eff.repository';
import { OrpEffMapper } from '../mappers/orp-eff.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class OrpEffRelationalRepository implements OrpEffRepository {
  constructor(
    @InjectRepository(OrpEffEntity)
    private readonly orpEffRepository: Repository<OrpEffEntity>,
  ) {}

  async create(data: OrpEff): Promise<OrpEff> {
    const persistenceModel = OrpEffMapper.toPersistence(data);
    const newEntity = await this.orpEffRepository.save(
      this.orpEffRepository.create(persistenceModel),
    );
    return OrpEffMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrpEff[]> {
    const entities = await this.orpEffRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => OrpEffMapper.toDomain(entity));
  }

  async findById(DOC_ID: OrpEff['DOC_ID']): Promise<NullableType<OrpEff>> {
    const entity = await this.orpEffRepository.findOne({
      where: { DOC_ID },
    });

    return entity ? OrpEffMapper.toDomain(entity) : null;
  }

  async findByIds(ids: OrpEff['DOC_ID'][]): Promise<OrpEff[]> {
    const entities = await this.orpEffRepository.find({
      where: { DOC_ID: In(ids) },
    });

    return entities.map((entity) => OrpEffMapper.toDomain(entity));
  }

  async update(
    DOC_ID: OrpEff['DOC_ID'],
    payload: Partial<OrpEff>,
  ): Promise<OrpEff> {
    const entity = await this.orpEffRepository.findOne({
      where: { DOC_ID },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.orpEffRepository.save(
      this.orpEffRepository.create(
        OrpEffMapper.toPersistence({
          ...OrpEffMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrpEffMapper.toDomain(updatedEntity);
  }

  async remove(DOC_ID: OrpEff['DOC_ID']): Promise<void> {
    await this.orpEffRepository.delete(DOC_ID);
  }
}
