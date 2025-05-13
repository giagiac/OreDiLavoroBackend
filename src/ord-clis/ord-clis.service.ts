import { Injectable } from '@nestjs/common';
import { CreateOrdCliDto } from './dto/create-ord-cli.dto';
import { UpdateOrdCliDto } from './dto/update-ord-cli.dto';
import { OrdCliRepository } from './infrastructure/persistence/ord-cli.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrdCli } from './domain/ord-cli';

@Injectable()
export class OrdClisService {
  constructor(
    // Dependencies here
    private readonly ordCliRepository: OrdCliRepository,
  ) {}

  async create(createOrdCliDto: CreateOrdCliDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.ordCliRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      NUM_SEDE: createOrdCliDto.NUM_SEDE,

      COD_CF: createOrdCliDto.COD_CF,

      DATA_DOC: createOrdCliDto.DATA_DOC,

      SERIE_DOC: createOrdCliDto.SERIE_DOC,

      NUM_DOC: createOrdCliDto.NUM_DOC,

      ANNO_DOC: createOrdCliDto.ANNO_DOC,

      // DOC_ID: createOrdCliDto.DOC_ID,

      AZIENDA_ID: createOrdCliDto.AZIENDA_ID,
    });
  }

  findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }) {
    return this.ordCliRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(DOC_ID: OrdCli['DOC_ID']) {
    return this.ordCliRepository.findById(DOC_ID);
  }

  findByIds(ids: OrdCli['DOC_ID'][]) {
    return this.ordCliRepository.findByIds(ids);
  }

  async update(
    DOC_ID: OrdCli['DOC_ID'],

    updateOrdCliDto: UpdateOrdCliDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.ordCliRepository.update(DOC_ID, {
      // Do not remove comment below.
      // <updating-property-payload />
      NUM_SEDE: updateOrdCliDto.NUM_SEDE,

      COD_CF: updateOrdCliDto.COD_CF,

      DATA_DOC: updateOrdCliDto.DATA_DOC,

      SERIE_DOC: updateOrdCliDto.SERIE_DOC,

      NUM_DOC: updateOrdCliDto.NUM_DOC,

      ANNO_DOC: updateOrdCliDto.ANNO_DOC,

      DOC_ID: updateOrdCliDto.DOC_ID,

      AZIENDA_ID: updateOrdCliDto.AZIENDA_ID,
    });
  }

  remove(DOC_ID: OrdCli['DOC_ID']) {
    return this.ordCliRepository.remove(DOC_ID);
  }
}
