import { OrpEffCiclisService } from '../orp-eff-ciclis/orp-eff-ciclis.service';

import { Injectable } from '@nestjs/common';
import { FilterDto, SortDto } from '../utils/dto/filter-column';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrpEffCicliEsec } from './domain/orp-eff-cicli-esec';
import { CreateOrpEffCicliEsecDto } from './dto/create-orp-eff-cicli-esec.dto';
import { OrpEffCicliEsecDto } from './dto/orp-eff-cicli-esec.dto';
import { UpdateOrpEffCicliEsecDto } from './dto/update-orp-eff-cicli-esec.dto';
import { OrpEffCicliEsecRepository } from './infrastructure/persistence/orp-eff-cicli-esec.repository';

@Injectable()
export class OrpEffCicliEsecsService {
  constructor(
    private readonly orpEffCicliService: OrpEffCiclisService,

    // Dependencies here
    private readonly orpEffCicliEsecRepository: OrpEffCicliEsecRepository,
  ) {}

  async create(createOrpEffCicliEsecDto: CreateOrpEffCicliEsecDto) {
    // Do not remove comment below.
    // <creating-property />
    // let orpEffCicli: OrpEffCicli | null | undefined = undefined;
    // if (createOrpEffCicliEsecDto.orpEffCicli) {
    //   const orpEffCicliObject = await this.orpEffCicliService.findById(
    //     createOrpEffCicliEsecDto.orpEffCicli.DOC_RIGA_ESEC_ID,
    //   );
    //   if (!orpEffCicliObject) {
    //     throw new UnprocessableEntityException({
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         orpEffCicli: 'notExists',
    //       },
    //     });
    //   }
    //   orpEffCicli = orpEffCicliObject;
    // } else if (createOrpEffCicliEsecDto.orpEffCicli === null) {
    //   orpEffCicli = null;
    // }
    // return this.orpEffCicliEsecRepository.create({
    //   // Do not remove comment below.
    //   // <creating-property-payload />
    //   DATA_FINE: createOrpEffCicliEsecDto.DATA_FINE,
    //   DATA_INIZIO: createOrpEffCicliEsecDto.DATA_INIZIO,
    //   TEMPO_OPERATORE: createOrpEffCicliEsecDto.TEMPO_OPERATORE,
    //   DOC_RIGA_ESEC_ID: createOrpEffCicliEsecDto.DOC_RIGA_ESEC_ID,
    //   NUM_ESEC: createOrpEffCicliEsecDto.NUM_ESEC,
    //   DOC_RIGA_ID: createOrpEffCicliEsecDto.DOC_RIGA_ID,
    //   NUM_RIGA: createOrpEffCicliEsecDto.NUM_RIGA,
    //   DOC_ID: createOrpEffCicliEsecDto.DOC_ID,
    //   AZIENDA_ID: createOrpEffCicliEsecDto.AZIENDA_ID,
    // });
  }

  findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join,
  }: {
    filterOptions?: Array<FilterDto<OrpEffCicliEsecDto>> | null;
    sortOptions?: Array<SortDto<OrpEffCicliEsecDto>> | null;
    paginationOptions: IPaginationOptions;
    join: boolean;
  }) {
    return this.orpEffCicliEsecRepository.findAllWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      join,
    });
  }

  findById(DOC_RIGA_ESEC_ID: OrpEffCicliEsec['DOC_RIGA_ESEC_ID']) {
    return this.orpEffCicliEsecRepository.findById(DOC_RIGA_ESEC_ID);
  }

  findByIds(ids: OrpEffCicliEsec['DOC_RIGA_ESEC_ID'][]) {
    return this.orpEffCicliEsecRepository.findByIds(ids);
  }

  async update(
    DOC_RIGA_ESEC_ID: OrpEffCicliEsec['DOC_RIGA_ESEC_ID'],

    updateOrpEffCicliEsecDto: UpdateOrpEffCicliEsecDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.orpEffCicliEsecRepository.update(DOC_RIGA_ESEC_ID, {
      // Do not remove comment below.
      // <updating-property-payload />
      DATA_FINE: updateOrpEffCicliEsecDto.DATA_FINE,

      DATA_INIZIO: updateOrpEffCicliEsecDto.DATA_INIZIO,

      TEMPO_OPERATORE: updateOrpEffCicliEsecDto.TEMPO_OPERATORE,

      DOC_RIGA_ESEC_ID: updateOrpEffCicliEsecDto.DOC_RIGA_ESEC_ID,

      NUM_ESEC: updateOrpEffCicliEsecDto.NUM_ESEC,

      DOC_RIGA_ID: updateOrpEffCicliEsecDto.DOC_RIGA_ID,

      NUM_RIGA: updateOrpEffCicliEsecDto.NUM_RIGA,

      DOC_ID: updateOrpEffCicliEsecDto.DOC_ID,

      AZIENDA_ID: updateOrpEffCicliEsecDto.AZIENDA_ID,
    });
  }

  remove(DOC_RIGA_ESEC_ID: OrpEffCicliEsec['DOC_RIGA_ESEC_ID']) {
    return this.orpEffCicliEsecRepository.remove(DOC_RIGA_ESEC_ID);
  }
}
