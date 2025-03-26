import { Injectable } from '@nestjs/common';
import { CreateOrdCliRigheDto } from './dto/create-ord-cli-righe.dto';
import { UpdateOrdCliRigheDto } from './dto/update-ord-cli-righe.dto';
import { OrdCliRigheRepository } from './infrastructure/persistence/ord-cli-righe.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrdCliRighe } from './domain/ord-cli-righe';

@Injectable()
export class OrdCliRighesService {
  constructor(
    // Dependencies here
    private readonly ordCliRigheRepository: OrdCliRigheRepository,
  ) {}

  async create(createOrdCliRigheDto: CreateOrdCliRigheDto) {
    // Do not remove comment below.
    // <creating-property />
    // return this.ordCliRigheRepository.create({
    //   // Do not remove comment below.
    //   // <creating-property-payload />
    //   DES_RIGA: createOrdCliRigheDto.DES_RIGA,
    //   COD_ART: createOrdCliRigheDto.COD_ART,
    //   COD_CF: createOrdCliRigheDto.COD_CF,
    //   DOC_RIGA_ID: createOrdCliRigheDto.DOC_RIGA_ID,
    //   NUM_RIGA: createOrdCliRigheDto.NUM_RIGA,
    //   DOC_ID: createOrdCliRigheDto.DOC_ID,
    //   AZIENDA_ID: createOrdCliRigheDto.AZIENDA_ID,
    // });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.ordCliRigheRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(DOC_RIGA_ID: OrdCliRighe['DOC_RIGA_ID']) {
    return this.ordCliRigheRepository.findById(DOC_RIGA_ID);
  }

  findByIds(ids: OrdCliRighe['DOC_RIGA_ID'][]) {
    return this.ordCliRigheRepository.findByIds(ids);
  }

  async update(
    DOC_RIGA_ID: OrdCliRighe['DOC_RIGA_ID'],

    updateOrdCliRigheDto: UpdateOrdCliRigheDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.ordCliRigheRepository.update(DOC_RIGA_ID, {
      // Do not remove comment below.
      // <updating-property-payload />
      DES_RIGA: updateOrdCliRigheDto.DES_RIGA,

      COD_ART: updateOrdCliRigheDto.COD_ART,

      COD_CF: updateOrdCliRigheDto.COD_CF,

      DOC_RIGA_ID: updateOrdCliRigheDto.DOC_RIGA_ID,

      NUM_RIGA: updateOrdCliRigheDto.NUM_RIGA,

      DOC_ID: updateOrdCliRigheDto.DOC_ID,

      AZIENDA_ID: updateOrdCliRigheDto.AZIENDA_ID,
    });
  }

  remove(DOC_RIGA_ID: OrdCliRighe['DOC_RIGA_ID']) {
    return this.ordCliRigheRepository.remove(DOC_RIGA_ID);
  }
}
