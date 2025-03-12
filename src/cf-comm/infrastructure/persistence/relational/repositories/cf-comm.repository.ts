import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { FilterDto } from '../../../../../utils/dto/filter-column';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { CfComm } from '../../../../domain/cf-comm';
import { CfCommDto } from '../../../../dto/cf-comm.dto';
import { SortCfCommDto } from '../../../../dto/find-all-cf-comm.dto';
import { CfCommRepository } from '../../cf-comm.repository';
import { CfCommEntity } from '../entities/cf-comm.entity';
import { CfCommMapper } from '../mappers/cf-comm.mapper';

@Injectable()
export class CfCommRelationalRepository implements CfCommRepository {
  constructor(
    @InjectRepository(CfCommEntity)
    private readonly cfCommRepository: Repository<CfCommEntity>,
  ) {}

  async create(data: CfComm): Promise<CfComm> {
    const persistenceModel = CfCommMapper.toPersistence(data);
    const newEntity = await this.cfCommRepository.save(
      this.cfCommRepository.create(persistenceModel),
    );
    return CfCommMapper.toDomain(newEntity);
  }

  applicaWhereLike(
    columnName: string,
    queryBuilder: SelectQueryBuilder<CfCommEntity>,
    filtri: Array<FilterDto<CfCommDto>> | null,
  ) {
    if (filtri && filtri.length > 0) {
      filtri.forEach((filtro) => {
        if (filtro.columnName && filtro.value) {
          queryBuilder.andWhere(
            `LOWER(${columnName}.${filtro.columnName}) like LOWER('${filtro.value}%')`,
          );
        }
      });
    }
  }

  applicaWhere(
    columnName: string,
    queryBuilder: SelectQueryBuilder<CfCommEntity>,
    filtri: Array<FilterDto<CfCommDto>> | null,
  ) {
    if (filtri && filtri.length > 0) {
      filtri.forEach((filtro) => {
        if (filtro.columnName && filtro.value) {
          queryBuilder.andWhere(
            //`LOWER(${columnName}.${filtro.columnName}) like LOWER('${filtro.value}%')`,
            `${columnName}.${filtro.columnName} =:${filtro.columnName}`,
            { [`${filtro.columnName}`]: filtro.value },
          );
        }
      });
    }
  }

  applicaSort(
    columnName: string,
    queryBuilder: SelectQueryBuilder<CfCommEntity>,
    sort: Array<SortCfCommDto> | null,
  ) {
    if (sort && sort.length > 0) {
      sort.forEach((sortItem) => {
        if (sortItem.orderBy && sortItem.order) {
          queryBuilder.addOrderBy(
            `LPAD(${columnName}.${sortItem.orderBy},10)`,
            sortItem.order.toUpperCase() as any,
          );
        }
      });
    }
  }

  async findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    //join,
  }: {
    filterOptions?: Array<FilterDto<CfCommDto>> | null;
    sortOptions?: Array<SortCfCommDto> | null;
    paginationOptions: IPaginationOptions;
    // join: boolean;
  }): Promise<{ data: CfComm[]; count: number }> {
    // const entities = await this.cfRepository.find({
    //   skip: (paginationOptions.page - 1) * paginationOptions.limit,
    //   take: paginationOptions.limit,
    //   relations: ['cfComm', 'cfComm.articoliCosti'],
    // });

    const entitiesSql = this.cfCommRepository
      .createQueryBuilder('cfComm')
      // .leftJoinAndSelect('cfComm.articoliCosti', 'articoliCosti')
      .offset((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    if (filterOptions) {
      this.applicaWhere('cfComm', entitiesSql, filterOptions);
    }

    if (sortOptions) {
      this.applicaSort('cfComm', entitiesSql, sortOptions);
    }

    // console.log(entitiesSql.getSql());

    const entitiesAndCount = await entitiesSql.getManyAndCount();

    return {
      data: entitiesAndCount[0].map((entity) => CfCommMapper.toDomain(entity)),
      count: entitiesAndCount[1],
    };
  }

  async findById(id: CfComm['COD_CF']): Promise<NullableType<CfComm>> {
    const entity = await this.cfCommRepository.findOne({
      where: { CF_COMM_ID: id },
    });

    return entity ? CfCommMapper.toDomain(entity) : null;
  }

  async findByIds(ids: CfComm['COD_CF'][]): Promise<CfComm[]> {
    const entities = await this.cfCommRepository.find({
      where: { CF_COMM_ID: In(ids) },
    });

    return entities.map((entity) => CfCommMapper.toDomain(entity));
  }

  async findByCodCf(COD_CF: CfComm['COD_CF']): Promise<CfComm[]> {
    const entities = await this.cfCommRepository.find({
      where: {
        COD_CF,
      },
    });

    return entities.map((entity) => CfCommMapper.toDomain(entity));
  }

  // async findByCodCfWithPagination({
  //   paginationOptions,
  //   COD_CF
  // }: {
  //   paginationOptions: IPaginationOptions,
  //   COD_CF: CfComm['COD_CF']
  // }): Promise<CfComm[]> {

  //   const entitiesSql = this.cfCommRepository
  //   .createQueryBuilder('cfComm')
  //   .leftJoinAndSelect('cfComm.articoliCosti', 'articoliCosti')
  //   .where({
  //     COD_CF
  //   })
  //   .orderBy("LPAD(cfComm.NUM_SEDE,10)", "ASC")
  //   //.addOrderBy("LPAD(cfComm.NUM_SEDE,10)", "ASC")
  //   .select()
  //   // .skip((paginationOptions.page - 1) * paginationOptions.limit)
  //   // .take(paginationOptions.limit)
  //   .offset((paginationOptions.page - 1) * paginationOptions.limit)
  //   .limit(paginationOptions.limit)

  //   console.log(entitiesSql.getSql())

  //   // // non è possibile ordinare in ORACLE LPAD
  //   // const entities = await this.cfCommRepository.find({
  //   //   where: {
  //   //     COD_CF
  //   //   },
  //   //   order: {
  //   //     "NUM_SEDE": {
  //   //       direction: "ASC",
  //   //       nulls: "FIRST",
  //   //     }
  //   //   },
  //   //   skip: (paginationOptions.page - 1) * paginationOptions.limit,
  //   //   take: paginationOptions.limit,
  //   //   relations: ['articoliCosti'],
  //   // });

  //   const aEntities = await entitiesSql.getMany()

  //   return aEntities.map((entity) => CfCommMapper.toDomain(entity));
  // }

  async update(
    id: CfComm['COD_CF'],
    payload: Partial<CfComm>,
  ): Promise<CfComm> {
    const entity = await this.cfCommRepository.findOne({
      where: { CF_COMM_ID: id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.cfCommRepository.save(
      this.cfCommRepository.create(
        CfCommMapper.toPersistence({
          ...CfCommMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CfCommMapper.toDomain(updatedEntity);
  }

  async remove(id: CfComm['COD_CF']): Promise<void> {
    await this.cfCommRepository.delete(id);
  }
}
