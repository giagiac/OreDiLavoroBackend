import { Injectable } from '@nestjs/common';
import { CreateOrdCliTrasDto } from './dto/create-ord-cli-tras.dto';
import { UpdateOrdCliTrasDto } from './dto/update-ord-cli-tras.dto';
import { OrdCliTrasRepository } from './infrastructure/persistence/ord-cli-tras.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrdCliTras } from './domain/ord-cli-tras';

@Injectable()
export class OrdCliTrasService {
  constructor(
    // Dependencies here
    private readonly ordCliTrasRepository: OrdCliTrasRepository,
  ) {}

  async create(createOrdCliTrasDto: CreateOrdCliTrasDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.ordCliTrasRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      //DOC_ID: createOrdCliTrasDto.DOC_ID,

      NOTE_DEST_MERCE: createOrdCliTrasDto.NOTE_DEST_MERCE,

      TEL_DEST_MERCE: createOrdCliTrasDto.TEL_DEST_MERCE,

      STATO_DEST_MERCE: createOrdCliTrasDto.STATO_DEST_MERCE,

      PROVINCIA_DEST_MERCE: createOrdCliTrasDto.PROVINCIA_DEST_MERCE,

      CAP_DEST_MERCE: createOrdCliTrasDto.CAP_DEST_MERCE,

      COMUNE_DEST_MERCE: createOrdCliTrasDto.COMUNE_DEST_MERCE,

      INDI_DEST_MERCE: createOrdCliTrasDto.INDI_DEST_MERCE,

      DES_DEST_MERCE: createOrdCliTrasDto.DES_DEST_MERCE,

      NUM_DEST: createOrdCliTrasDto.NUM_DEST,
    });
  }

  findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }) {
    return this.ordCliTrasRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(DOC_ID: OrdCliTras['DOC_ID']) {
    return this.ordCliTrasRepository.findById(DOC_ID);
  }

  findByIds(ids: OrdCliTras['DOC_ID'][]) {
    return this.ordCliTrasRepository.findByIds(ids);
  }

  async update(
    DOC_ID: OrdCliTras['DOC_ID'],

    updateOrdCliTrasDto: UpdateOrdCliTrasDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.ordCliTrasRepository.update(DOC_ID, {
      // Do not remove comment below.
      // <updating-property-payload />
      DOC_ID: updateOrdCliTrasDto.DOC_ID,

      NOTE_DEST_MERCE: updateOrdCliTrasDto.NOTE_DEST_MERCE,

      TEL_DEST_MERCE: updateOrdCliTrasDto.TEL_DEST_MERCE,

      STATO_DEST_MERCE: updateOrdCliTrasDto.STATO_DEST_MERCE,

      PROVINCIA_DEST_MERCE: updateOrdCliTrasDto.PROVINCIA_DEST_MERCE,

      CAP_DEST_MERCE: updateOrdCliTrasDto.CAP_DEST_MERCE,

      COMUNE_DEST_MERCE: updateOrdCliTrasDto.COMUNE_DEST_MERCE,

      INDI_DEST_MERCE: updateOrdCliTrasDto.INDI_DEST_MERCE,

      DES_DEST_MERCE: updateOrdCliTrasDto.DES_DEST_MERCE,

      NUM_DEST: updateOrdCliTrasDto.NUM_DEST,
    });
  }

  remove(DOC_ID: OrdCliTras['DOC_ID']) {
    return this.ordCliTrasRepository.remove(DOC_ID);
  }
}
