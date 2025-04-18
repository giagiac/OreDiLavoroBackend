import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { OperatoriEntity } from '../entities/operatori.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Operatori } from '../../../../domain/operatori';
import { OperatoriRepository } from '../../operatori.repository';
import { OperatoriMapper } from '../mappers/operatori.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { OperatoriDto } from '../../../../dto/operatori.dto';
import {
  applicaSort,
  applicaWhereFullLike,
  applicaWhereLike,
  FilterDto,
  SortDto,
} from '../../../../../utils/dto/filter-column';

@Injectable()
export class OperatoriRelationalRepository implements OperatoriRepository {
  constructor(
    @InjectRepository(OperatoriEntity)
    private readonly operatoriRepository: Repository<OperatoriEntity>,
  ) {}

  async create(data: Operatori): Promise<Operatori> {
    const persistenceModel = OperatoriMapper.toPersistence(data);
    const newEntity = await this.operatoriRepository.save(
      this.operatoriRepository.create(persistenceModel),
    );
    return OperatoriMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join,
  }: {
    filterOptions?: Array<FilterDto<OperatoriDto>> | null;
    sortOptions?: Array<SortDto<OperatoriDto>> | null;
    paginationOptions: IPaginationOptions;
    join: boolean;
  }): Promise<{ operatori: Operatori[]; count: number }> {
    // const entities = await this.operatoriRepository.find({
    //   skip: (paginationOptions.page - 1) * paginationOptions.limit,
    //   take: paginationOptions.limit,
    // });

    // return entities.map((entity) => OperatoriMapper.toDomain(entity));

    const entitiesSql = this.operatoriRepository
      .createQueryBuilder('operatori')
      .leftJoinAndSelect('operatori.user', 'user')
      .offset((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    if (filterOptions) {
      applicaWhereFullLike('operatori', entitiesSql, filterOptions);
    }

    if (sortOptions) {
      applicaSort('operatori', entitiesSql, sortOptions);
    }

    const entitiesAndCount = await entitiesSql.getManyAndCount();

    return {
      operatori: entitiesAndCount[0].map((entity) =>
        OperatoriMapper.toDomain(entity),
      ),
      count: entitiesAndCount[1],
    };
  }

  async findAllEsecuzioniWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join,
  }: {
    filterOptions?: Array<FilterDto<OperatoriDto>> | null;
    sortOptions?: Array<SortDto<OperatoriDto>> | null;
    paginationOptions: IPaginationOptions;
    join: boolean;
  }): Promise<{ operatori: Operatori[]; count: number }> {
    // --- Logica per determinare la data da usare ---
    const today = new Date(); // Data odierna di default
    let targetDateInizio = today; // Inizializza la data target con oggi
    let targetDateFine = today;

    const entitiesSql = this.operatoriRepository
      .createQueryBuilder('operatori')
      .leftJoinAndSelect('operatori.user', 'user')
      .innerJoin(
        'operatori.epsNestjsOrpEffCicliEsec',
        'epsNestjsOrpEffCicliEsec',
      )
      .andWhere(
        '(TRUNC(epsNestjsOrpEffCicliEsec.DATA_INIZIO) <= TRUNC(:tFine) AND TRUNC(epsNestjsOrpEffCicliEsec.DATA_FINE) >= TRUNC(:tInizio))',
        {
          tInizio: targetDateInizio,
          tFine: targetDateFine,
        },
      )
      .offset((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    if (filterOptions) {
      applicaWhereFullLike('operatori', entitiesSql, filterOptions);
    }

    if (sortOptions) {
      applicaSort('operatori', entitiesSql, sortOptions);
    }

    const entitiesAndCount = await entitiesSql.getManyAndCount();

    return {
      operatori: entitiesAndCount[0].map((entity) =>
        OperatoriMapper.toDomain(entity),
      ),
      count: entitiesAndCount[1],
    };
  }

  async findById(
    COD_OP: Operatori['COD_OP'],
  ): Promise<NullableType<Operatori>> {
    const entity = await this.operatoriRepository.findOne({
      where: { COD_OP },
    });

    return entity ? OperatoriMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Operatori['COD_OP'][]): Promise<Operatori[]> {
    const entities = await this.operatoriRepository.find({
      where: { COD_OP: In(ids) },
    });

    return entities.map((entity) => OperatoriMapper.toDomain(entity));
  }

  async update(
    COD_OP: Operatori['COD_OP'],
    payload: Partial<Operatori>,
  ): Promise<Operatori> {
    const entity = await this.operatoriRepository.findOne({
      where: { COD_OP },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.operatoriRepository.save(
      this.operatoriRepository.create(
        OperatoriMapper.toPersistence({
          ...OperatoriMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OperatoriMapper.toDomain(updatedEntity);
  }

  async remove(COD_OP: Operatori['COD_OP']): Promise<void> {
    await this.operatoriRepository.delete(COD_OP);
  }
}
