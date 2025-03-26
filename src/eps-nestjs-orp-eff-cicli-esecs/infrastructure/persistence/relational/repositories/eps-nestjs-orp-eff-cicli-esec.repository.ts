import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { EpsNestjsOrpEffCicliEsec } from '../../../../domain/eps-nestjs-orp-eff-cicli-esec';
import { EpsNestjsOrpEffCicliEsecRepository } from '../../eps-nestjs-orp-eff-cicli-esec.repository';
import { EpsNestjsOrpEffCicliEsecEntity } from '../entities/eps-nestjs-orp-eff-cicli-esec.entity';
import { EpsNestjsOrpEffCicliEsecMapper } from '../mappers/eps-nestjs-orp-eff-cicli-esec.mapper';
import { EpsNestjsOrpEffCicliEsecDto } from '../../../../dto/esp-nestjs-orp-eff-cicli-esec.dto';
import { CfCommMapper } from '../../../../../cf-comm/infrastructure/persistence/relational/mappers/cf-comm.mapper';
import { FilterDto, SortDto } from '../../../../../utils/dto/filter-column';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class EpsNestjsOrpEffCicliEsecRelationalRepository
  implements EpsNestjsOrpEffCicliEsecRepository
{
  constructor(
    @InjectRepository(EpsNestjsOrpEffCicliEsecEntity)
    private readonly epsNestjsOrpEffCicliEsecRepository: Repository<EpsNestjsOrpEffCicliEsecEntity>,
  ) {}

  async create(
    data: EpsNestjsOrpEffCicliEsec,
  ): Promise<EpsNestjsOrpEffCicliEsec> {
    const persistenceModel = EpsNestjsOrpEffCicliEsecMapper.toPersistence(data);
    const newEntity = await this.epsNestjsOrpEffCicliEsecRepository.save(
      this.epsNestjsOrpEffCicliEsecRepository.create(persistenceModel),
    );
    return EpsNestjsOrpEffCicliEsecMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    user,
  }: {
    filterOptions?: Array<FilterDto<EpsNestjsOrpEffCicliEsec>> | null;
    sortOptions?: Array<SortDto<EpsNestjsOrpEffCicliEsecDto>> | null;
    paginationOptions: IPaginationOptions;
    user: UserEntity | null;
  }): Promise<{ data: EpsNestjsOrpEffCicliEsec[]; count: number }> {
    // const entities = await this.cfRepository.find({
    //   skip: (paginationOptions.page - 1) * paginationOptions.limit,
    //   take: paginationOptions.limit,
    //   relations: ['cfComm', 'cfComm.articoliCosti'],
    // });

    const entitiesSql = this.epsNestjsOrpEffCicliEsecRepository
      .createQueryBuilder('cfComm')
      .leftJoinAndSelect('cfComm.articoliCostiCfComm', 'articoliCostiCfComm')
      .leftJoinAndSelect('articoliCostiCfComm.artAna', 'artAna')
      .leftJoinAndSelect('artAna.artCosti', 'artCosti')
      .offset((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    console.log(entitiesSql.getSql());

    const entitiesAndCount = await entitiesSql.getManyAndCount();

    return {
      data: entitiesAndCount[0].map((entity) =>
        EpsNestjsOrpEffCicliEsecMapper.toDomain(entity),
      ),
      count: entitiesAndCount[1],
    };
  }

  async findById(
    id: EpsNestjsOrpEffCicliEsec['id'],
  ): Promise<NullableType<EpsNestjsOrpEffCicliEsec>> {
    const entity = await this.epsNestjsOrpEffCicliEsecRepository.findOne({
      where: { id },
    });

    return entity ? EpsNestjsOrpEffCicliEsecMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: EpsNestjsOrpEffCicliEsec['id'][],
  ): Promise<EpsNestjsOrpEffCicliEsec[]> {
    const entities = await this.epsNestjsOrpEffCicliEsecRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) =>
      EpsNestjsOrpEffCicliEsecMapper.toDomain(entity),
    );
  }

  async update(
    id: EpsNestjsOrpEffCicliEsec['id'],
    payload: Partial<EpsNestjsOrpEffCicliEsec>,
  ): Promise<EpsNestjsOrpEffCicliEsec> {
    const entity = await this.epsNestjsOrpEffCicliEsecRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.epsNestjsOrpEffCicliEsecRepository.save(
      this.epsNestjsOrpEffCicliEsecRepository.create(
        EpsNestjsOrpEffCicliEsecMapper.toPersistence({
          ...EpsNestjsOrpEffCicliEsecMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return EpsNestjsOrpEffCicliEsecMapper.toDomain(updatedEntity);
  }

  async remove(id: EpsNestjsOrpEffCicliEsec['id']): Promise<void> {
    await this.epsNestjsOrpEffCicliEsecRepository.delete(id);
  }
}
