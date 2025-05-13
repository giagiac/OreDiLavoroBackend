import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { EpsNestjsTargaMezziEntity } from '../entities/eps-nestjs-targa-mezzi.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { EpsNestjsTargaMezzi } from '../../../../domain/eps-nestjs-targa-mezzi';
import { EpsNestjsTargaMezziRepository } from '../../eps-nestjs-targa-mezzi.repository';
import { EpsNestjsTargaMezziMapper } from '../mappers/eps-nestjs-targa-mezzi.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { applicaSort, applicaWhereLike, FilterDto, SortDto } from '../../../../../utils/dto/filter-column';
import { EpsNestjsTargaMezziDto } from '../../../../dto/eps-nestjs-targa-mezzi.dto';

@Injectable()
export class EpsNestjsTargaMezziRelationalRepository implements EpsNestjsTargaMezziRepository {
  constructor(
    @InjectRepository(EpsNestjsTargaMezziEntity)
    private readonly epsNestjsTargaMezziRepository: Repository<EpsNestjsTargaMezziEntity>,
  ) {}

  async create(data: EpsNestjsTargaMezzi): Promise<EpsNestjsTargaMezzi> {
    const persistenceModel = EpsNestjsTargaMezziMapper.toPersistence(data);
    const newEntity = await this.epsNestjsTargaMezziRepository.save(this.epsNestjsTargaMezziRepository.create(persistenceModel));
    return EpsNestjsTargaMezziMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join,
  }: {
    filterOptions?: Array<FilterDto<EpsNestjsTargaMezziDto>> | null;
    sortOptions?: Array<SortDto<EpsNestjsTargaMezziDto>> | null;
    paginationOptions: IPaginationOptions;
    join: boolean;
  }): Promise<{ epsNestjsTargaMezzi: EpsNestjsTargaMezzi[]; count: number }> {
    const entitiesSql = this.epsNestjsTargaMezziRepository
      .createQueryBuilder('epsNestjsTargaMezzi')
      .leftJoinAndSelect('epsNestjsTargaMezzi.artAna', 'artAna')
      .offset((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    if (filterOptions) {
      applicaWhereLike('epsNestjsTargaMezzi', entitiesSql, filterOptions);
    }

    if (sortOptions) {
      applicaSort('epsNestjsTargaMezzi', entitiesSql, sortOptions);
    }

    const entitiesAndCount = await entitiesSql.getManyAndCount();

    return {
      epsNestjsTargaMezzi: entitiesAndCount[0].map((entity) => EpsNestjsTargaMezziMapper.toDomain(entity)),
      count: entitiesAndCount[1],
    };
  }

  async findById(id: EpsNestjsTargaMezzi['id']): Promise<NullableType<EpsNestjsTargaMezzi>> {
    const entity = await this.epsNestjsTargaMezziRepository.findOne({
      where: { id },
    });

    return entity ? EpsNestjsTargaMezziMapper.toDomain(entity) : null;
  }

  async findByIds(ids: EpsNestjsTargaMezzi['id'][]): Promise<EpsNestjsTargaMezzi[]> {
    const entities = await this.epsNestjsTargaMezziRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => EpsNestjsTargaMezziMapper.toDomain(entity));
  }

  async update(COD_ART: EpsNestjsTargaMezzi['COD_ART'], payload: Partial<EpsNestjsTargaMezzi>): Promise<EpsNestjsTargaMezzi> {
    const entity = await this.epsNestjsTargaMezziRepository.findOne({
      where: { COD_ART },
    });

    if (!entity) {
      const persistenceModel = EpsNestjsTargaMezziMapper.toPersistence({
        COD_ART,
        id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        artAna: null,
      });
      const newEntity = await this.epsNestjsTargaMezziRepository.save(this.epsNestjsTargaMezziRepository.create(persistenceModel));
      return EpsNestjsTargaMezziMapper.toDomain(newEntity);
    }

    const updatedEntity = await this.epsNestjsTargaMezziRepository.save(
      this.epsNestjsTargaMezziRepository.create(
        EpsNestjsTargaMezziMapper.toPersistence({
          ...EpsNestjsTargaMezziMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return EpsNestjsTargaMezziMapper.toDomain(updatedEntity);
  }

  async remove(id: EpsNestjsTargaMezzi['id']): Promise<void> {
    await this.epsNestjsTargaMezziRepository.delete(id);
  }
}
