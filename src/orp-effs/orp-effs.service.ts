import { Injectable } from '@nestjs/common';
import { CreateOrpEffDto } from './dto/create-orp-eff.dto';
import { UpdateOrpEffDto } from './dto/update-orp-eff.dto';
import { OrpEffRepository } from './infrastructure/persistence/orp-eff.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrpEff } from './domain/orp-eff';

@Injectable()
export class OrpEffsService {
  constructor(
    // Dependencies here
    private readonly orpEffRepository: OrpEffRepository,
  ) {}

  async create(createOrpEffDto: CreateOrpEffDto) {
    // Do not remove comment below.
    // <creating-property />
    // return this.orpEffRepository.create({
    //   // Do not remove comment below.
    //   // <creating-property-payload />
    //   DATA_DOC: createOrpEffDto.DATA_DOC,
    //   SERIE_DOC: createOrpEffDto.SERIE_DOC,
    //   NUM_DOC: createOrpEffDto.NUM_DOC,
    //   ANNO_DOC: createOrpEffDto.ANNO_DOC,
    //   DOC_ID: createOrpEffDto.DOC_ID,
    //   AZIENDA_ID: createOrpEffDto.AZIENDA_ID,
    // });
  }

  findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }) {
    return this.orpEffRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(DOC_ID: OrpEff['DOC_ID']) {
    return this.orpEffRepository.findById(DOC_ID);
  }

  findByIds(ids: OrpEff['DOC_ID'][]) {
    return this.orpEffRepository.findByIds(ids);
  }

  async update(
    DOC_ID: OrpEff['DOC_ID'],

    updateOrpEffDto: UpdateOrpEffDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.orpEffRepository.update(DOC_ID, {
      // Do not remove comment below.
      // <updating-property-payload />
      DATA_DOC: updateOrpEffDto.DATA_DOC,

      SERIE_DOC: updateOrpEffDto.SERIE_DOC,

      NUM_DOC: updateOrpEffDto.NUM_DOC,

      ANNO_DOC: updateOrpEffDto.ANNO_DOC,

      DOC_ID: updateOrpEffDto.DOC_ID,

      AZIENDA_ID: updateOrpEffDto.AZIENDA_ID,
    });
  }

  remove(DOC_ID: OrpEff['DOC_ID']) {
    return this.orpEffRepository.remove(DOC_ID);
  }
}
