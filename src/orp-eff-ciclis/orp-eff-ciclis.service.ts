import { Injectable } from '@nestjs/common';
import { CreateOrpEffCicliDto } from './dto/create-orp-eff-cicli.dto';
import { UpdateOrpEffCicliDto } from './dto/update-orp-eff-cicli.dto';
import { OrpEffCicliRepository } from './infrastructure/persistence/orp-eff-cicli.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrpEffCicli } from './domain/orp-eff-cicli';
import { FilterDto, SortDto } from '../utils/dto/filter-column';
import { OrpEffCicliDto } from './dto/orp-eff-cicli.dto';

@Injectable()
export class OrpEffCiclisService {
  constructor(
    // Dependencies here
    private readonly orpEffCicliRepository: OrpEffCicliRepository,
  ) {}

  async create(createOrpEffCicliDto: CreateOrpEffCicliDto) {
    // Do not remove comment below.
    // <creating-property />
    // return this.orpEffCicliRepository.create({
    //   // Do not remove comment below.
    //   // <creating-property-payload />
    //   DES_LAV: createOrpEffCicliDto.DES_LAV,
    //   DOC_RIGA_ID: createOrpEffCicliDto.DOC_RIGA_ID,
    //   NUM_RIGA: createOrpEffCicliDto.NUM_RIGA,
    //   DOC_ID: createOrpEffCicliDto.DOC_ID,
    //   AZIENDA_ID: createOrpEffCicliDto.AZIENDA_ID,
    // });
  }

  findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join,
  }: {
    filterOptions?: Array<FilterDto<OrpEffCicliDto>> | null;
    sortOptions?: Array<SortDto<OrpEffCicliDto>> | null;
    paginationOptions: IPaginationOptions;
    join: boolean;
  }) {
    return this.orpEffCicliRepository.findAllWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      join,
    });
  }

  findById(DOC_RIGA_ID: OrpEffCicli['DOC_RIGA_ID']) {
    return this.orpEffCicliRepository.findById(DOC_RIGA_ID);
  }

  findByIds(ids: OrpEffCicli['DOC_RIGA_ID'][]) {
    return this.orpEffCicliRepository.findByIds(ids);
  }

  async update(
    DOC_RIGA_ID: OrpEffCicli['DOC_RIGA_ID'],

    updateOrpEffCicliDto: UpdateOrpEffCicliDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.orpEffCicliRepository.update(DOC_RIGA_ID, {
      // Do not remove comment below.
      // <updating-property-payload />
      DES_LAV: updateOrpEffCicliDto.DES_LAV,

      DOC_RIGA_ID: updateOrpEffCicliDto.DOC_RIGA_ID,

      NUM_RIGA: updateOrpEffCicliDto.NUM_RIGA,

      DOC_ID: updateOrpEffCicliDto.DOC_ID,

      AZIENDA_ID: updateOrpEffCicliDto.AZIENDA_ID,
    });
  }

  remove(DOC_RIGA_ID: OrpEffCicli['DOC_RIGA_ID']) {
    return this.orpEffCicliRepository.remove(DOC_RIGA_ID);
  }
}
