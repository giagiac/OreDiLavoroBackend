import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Cf } from './domain/cf';
import { CreateCfDto } from './dto/create-cf.dto';
import { SortCfDto } from './dto/find-all-cfs.dto';
import { UpdateCfDto } from './dto/update-cf.dto';
import { CfRepository } from './infrastructure/persistence/cf.repository';
import { FilterDto } from '../utils/dto/filter-column';
import { CfDto } from './dto/cf.dto';

@Injectable()
export class CfsService {
  constructor(
    // Dependencies here
    private readonly cfRepository: CfRepository,
  ) {}

  async create(createCfDto: CreateCfDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.cfRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      COD_FISC_CF: createCfDto.COD_FISC_CF,

      P_IVA_CF: createCfDto.P_IVA_CF,

      RAG_SOC_CF_INT: createCfDto.RAG_SOC_CF_INT,

      RAG_SOC_CF: createCfDto.RAG_SOC_CF,

      COD_CF: createCfDto.COD_CF,
    });
  }

  findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join
  }: {
    filterOptions?: Array<FilterDto<CfDto>> | null;
    sortOptions?: Array<SortCfDto> | null;
    paginationOptions: IPaginationOptions;
    join: boolean
  }) {
    return this.cfRepository.findAllWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      join
    });
  }

  findById(id: Cf['COD_CF']) {
    return this.cfRepository.findById(id);
  }

  findByIds(ids: Cf['COD_CF'][]) {
    return this.cfRepository.findByIds(ids);
  }

  async update(
    id: Cf['COD_CF'],

    updateCfDto: UpdateCfDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.cfRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      COD_FISC_CF: updateCfDto.COD_FISC_CF,

      P_IVA_CF: updateCfDto.P_IVA_CF,

      RAG_SOC_CF_INT: updateCfDto.RAG_SOC_CF_INT,

      RAG_SOC_CF: updateCfDto.RAG_SOC_CF,

      COD_CF: updateCfDto.COD_CF,
    });
  }

  remove(id: Cf['COD_CF']) {
    return this.cfRepository.remove(id);
  }
}
