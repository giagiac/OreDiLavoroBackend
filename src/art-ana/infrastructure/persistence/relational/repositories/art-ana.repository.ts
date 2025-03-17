import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { FilterDto } from '../../../../../utils/dto/filter-column';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ArtAna } from '../../../../domain/art-ana';
import { ArtAnaDto } from '../../../../dto/art-ana.dto';
import { SortArtAnaDto } from '../../../../dto/find-all-art-ana.dto';
import { ArtAnaRepository } from '../../art-ana.repository';
import { ArtAnaEntity } from '../entities/art-ana.entity';
import { ArtAnaMapper } from '../mappers/art-ana.mapper';

@Injectable()
export class ArtAnanaRelationalRepository implements ArtAnaRepository {
  constructor(
    @InjectRepository(ArtAnaEntity)
    private readonly artAnaRepository: Repository<ArtAnaEntity>,
  ) {}

  async create(data: ArtAna): Promise<ArtAna> {
    const persistenceModel = ArtAnaMapper.toPersistence(data);
    const newEntity = await this.artAnaRepository.save(
      this.artAnaRepository.create(persistenceModel),
    );
    return ArtAnaMapper.toDomain(newEntity);
  }

  applicaWhereLike(
    columnName: string,
    queryBuilder: SelectQueryBuilder<ArtAnaEntity>,
    filtri: Array<FilterDto<ArtAnaDto>> | null,
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
    queryBuilder: SelectQueryBuilder<ArtAnaEntity>,
    filtri: Array<FilterDto<ArtAnaDto>> | null,
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
    queryBuilder: SelectQueryBuilder<ArtAnaEntity>,
    sort: Array<SortArtAnaDto> | null,
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
    filterOptions?: Array<FilterDto<ArtAnaDto>> | null;
    sortOptions?: Array<SortArtAnaDto> | null;
    paginationOptions: IPaginationOptions;
    // join: boolean;
  }): Promise<{ data: ArtAna[]; count: number }> {
    // const entities = await this.cfRepository.find({
    //   skip: (paginationOptions.page - 1) * paginationOptions.limit,
    //   take: paginationOptions.limit,
    //   relations: ['artAna', 'artAna.articoliCosti'],
    // });

    const entitiesSql = this.artAnaRepository
      .createQueryBuilder('artAna')
      .offset((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    if (filterOptions) {
      this.applicaWhereLike('artAna', entitiesSql, filterOptions);
    }

    if (sortOptions) {
      this.applicaSort('artAna', entitiesSql, sortOptions);
    }

    // console.log(entitiesSql.getSql());

    const entitiesAndCount = await entitiesSql.getManyAndCount();

    return {
      data: entitiesAndCount[0].map((entity) => ArtAnaMapper.toDomain(entity)),
      count: entitiesAndCount[1],
    };
  }

  async findById(id: ArtAna['COD_ART']): Promise<NullableType<ArtAna>> {
    const entity = await this.artAnaRepository.findOne({
      where: { COD_ART: id },
    });

    return entity ? ArtAnaMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ArtAna['COD_ART'][]): Promise<ArtAna[]> {
    const entities = await this.artAnaRepository.find({
      where: { COD_ART: In(ids) },
    });

    return entities.map((entity) => ArtAnaMapper.toDomain(entity));
  }

  async update(
    id: ArtAna['COD_ART'],
    payload: Partial<ArtAna>,
  ): Promise<ArtAna> {
    const entity = await this.artAnaRepository.findOne({
      where: { COD_ART: id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.artAnaRepository.save(
      this.artAnaRepository.create(
        ArtAnaMapper.toPersistence({
          ...ArtAnaMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ArtAnaMapper.toDomain(updatedEntity);
  }

  async remove(id: ArtAna['COD_ART']): Promise<void> {
    await this.artAnaRepository.delete(id);
  }
}
