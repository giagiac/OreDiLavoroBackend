import { Injectable } from '@nestjs/common';
import { CreateEpsNestjsTargaMezziDto } from './dto/create-eps-nestjs-targa-mezzi.dto';
import { UpdateEpsNestjsTargaMezziDto } from './dto/update-eps-nestjs-targa-mezzi.dto';
import { EpsNestjsTargaMezziRepository } from './infrastructure/persistence/eps-nestjs-targa-mezzi.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { EpsNestjsTargaMezzi } from './domain/eps-nestjs-targa-mezzi';
import { FilterDto, SortDto } from '../utils/dto/filter-column';
import { EpsNestjsTargaMezziDto } from './dto/eps-nestjs-targa-mezzi.dto';

@Injectable()
export class EpsNestjsTargaMezzisService {
  constructor(
    // Dependencies here
    private readonly epsNestjsTargaMezziRepository: EpsNestjsTargaMezziRepository,
  ) {}

  async create(createEpsNestjsTargaMezziDto: CreateEpsNestjsTargaMezziDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.epsNestjsTargaMezziRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      COD_ART: createEpsNestjsTargaMezziDto.COD_ART,
    });
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
  }) {
    return this.epsNestjsTargaMezziRepository.findAllWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      join,
    });
  }

  findById(id: EpsNestjsTargaMezzi['id']) {
    return this.epsNestjsTargaMezziRepository.findById(id);
  }

  findByIds(ids: EpsNestjsTargaMezzi['id'][]) {
    return this.epsNestjsTargaMezziRepository.findByIds(ids);
  }

  async update(
    id: EpsNestjsTargaMezzi['id'],

    updateEpsNestjsTargaMezziDto: UpdateEpsNestjsTargaMezziDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.epsNestjsTargaMezziRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      COD_ART: updateEpsNestjsTargaMezziDto.COD_ART,
    });
  }

  remove(id: EpsNestjsTargaMezzi['id']) {
    return this.epsNestjsTargaMezziRepository.remove(id);
  }
}
