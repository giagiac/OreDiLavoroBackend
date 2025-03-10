import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { nsorpeffcicliesec } from './domain/nsorpeffcicliesec';
import { CreatensorpeffcicliesecDto } from './dto/create-nsorpeffcicliesec.dto';
import { UpdatensorpeffcicliesecDto } from './dto/update-nsorpeffcicliesec.dto';
import { nsorpeffcicliesecRepository } from './infrastructure/persistence/nsorpeffcicliesec.repository';

@Injectable()
export class nsorpeffcicliesecService {
  constructor(
    // Dependencies here
    private readonly nsorpeffcicliesecRepository: nsorpeffcicliesecRepository,
  ) {}

  async create(creatensorpeffcicliesecDto: CreatensorpeffcicliesecDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.nsorpeffcicliesecRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      DOC_RIGA_ID: creatensorpeffcicliesecDto.DOC_RIGA_ID,

      NUM_RIGA: creatensorpeffcicliesecDto.NUM_RIGA,

      DOC_ID: creatensorpeffcicliesecDto.DOC_ID,

      AZIENDA_ID: creatensorpeffcicliesecDto.AZIENDA_ID,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.nsorpeffcicliesecRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: nsorpeffcicliesec['id']) {
    return this.nsorpeffcicliesecRepository.findById(id);
  }

  findByIds(ids: nsorpeffcicliesec['id'][]) {
    return this.nsorpeffcicliesecRepository.findByIds(ids);
  }

  async update(
    id: nsorpeffcicliesec['id'],

    updatensorpeffcicliesecDto: UpdatensorpeffcicliesecDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.nsorpeffcicliesecRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      DOC_RIGA_ID: updatensorpeffcicliesecDto.DOC_RIGA_ID,

      NUM_RIGA: updatensorpeffcicliesecDto.NUM_RIGA,

      DOC_ID: updatensorpeffcicliesecDto.DOC_ID,

      AZIENDA_ID: updatensorpeffcicliesecDto.AZIENDA_ID,
    });
  }

  remove(id: nsorpeffcicliesec['id']) {
    return this.nsorpeffcicliesecRepository.remove(id);
  }
}
