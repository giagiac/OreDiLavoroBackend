import { Injectable } from '@nestjs/common';
import { CreateCfCommDto } from './dto/create-cf-comm.dto';
import { UpdateCfCommDto } from './dto/update-cf-comm.dto';
import { CfCommRepository } from './infrastructure/persistence/cf-comm.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CfComm } from './domain/cf-comm';
import { CfCommDto } from './dto/cf-comm.dto';
import { FilterDto } from '../utils/dto/filter-column';
import { SortCfCommDto } from './dto/find-all-cf-comms.dto';

@Injectable()
export class CfCommsService {
  constructor(
    // Dependencies here
    private readonly cfCommRepository: CfCommRepository,
  ) {}

  async create(createCfCommDto: CreateCfCommDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.cfCommRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      NODE_SEDE: createCfCommDto.NODE_SEDE,

      RIFERIMENTO_SEDE: createCfCommDto.RIFERIMENTO_SEDE,

      E_MAIL_SEDE: createCfCommDto.E_MAIL_SEDE,

      FAX_SEDE: createCfCommDto.FAX_SEDE,

      TEL_SEDE: createCfCommDto.TEL_SEDE,

      PROVINCIA_SEDE: createCfCommDto.PROVINCIA_SEDE,

      COMUNE_SEDE: createCfCommDto.COMUNE_SEDE,

      CAP_SEDE: createCfCommDto.CAP_SEDE,

      INDI_SEDE: createCfCommDto.INDI_SEDE,

      CF_COMM_ID: createCfCommDto.CF_COMM_ID,

      COD_CF: createCfCommDto.COD_CF,

      DES_SEDE: createCfCommDto.DES_SEDE,

      NUM_SEDE: createCfCommDto.NUM_SEDE,

      articoliCosti: null
    });
  }

  findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions
  }: {
    filterOptions?: Array<FilterDto<CfCommDto>> | null;
    sortOptions?: Array<SortCfCommDto> | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.cfCommRepository.findAllWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      }
    });
  }

  findById(id: CfComm['COD_CF']) {
    return this.cfCommRepository.findById(id);
  }

  findByIds(ids: CfComm['COD_CF'][]) {
    return this.cfCommRepository.findByIds(ids);
  }

  findByCodCf(COD_CF: CfComm['COD_CF']) {
    return this.cfCommRepository.findByCodCf(COD_CF);
  }

  async update(
    id: CfComm['COD_CF'],

    updateCfCommDto: UpdateCfCommDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.cfCommRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      NODE_SEDE: updateCfCommDto.NODE_SEDE,

      RIFERIMENTO_SEDE: updateCfCommDto.RIFERIMENTO_SEDE,

      E_MAIL_SEDE: updateCfCommDto.E_MAIL_SEDE,

      FAX_SEDE: updateCfCommDto.FAX_SEDE,

      TEL_SEDE: updateCfCommDto.TEL_SEDE,

      PROVINCIA_SEDE: updateCfCommDto.PROVINCIA_SEDE,

      COMUNE_SEDE: updateCfCommDto.COMUNE_SEDE,

      CAP_SEDE: updateCfCommDto.CAP_SEDE,

      INDI_SEDE: updateCfCommDto.INDI_SEDE,

      CF_COMM_ID: updateCfCommDto.CF_COMM_ID,

      COD_CF: updateCfCommDto.COD_CF,

      DES_SEDE: updateCfCommDto.DES_SEDE,

      NUM_SEDE: updateCfCommDto.NUM_SEDE,
    });
  }

  remove(id: CfComm['COD_CF']) {
    return this.cfCommRepository.remove(id);
  }
}
