import { Injectable } from '@nestjs/common';
import { CreateEpsNestjsDestinazioniDto } from './dto/create-eps-nestjs-destinazioni.dto';
import { UpdateEpsNestjsDestinazioniDto } from './dto/update-eps-nestjs-destinazioni.dto';
import { EpsNestjsDestinazioniRepository } from './infrastructure/persistence/eps-nestjs-destinazioni.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { EpsNestjsDestinazioni } from './domain/eps-nestjs-destinazioni';

@Injectable()
export class EpsNestjsDestinazionisService {
  constructor(
    // Dependencies here
    private readonly epsNestjsDestinazioniRepository: EpsNestjsDestinazioniRepository,
  ) {}

  async create(createEpsNestjsDestinazioniDto: CreateEpsNestjsDestinazioniDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.epsNestjsDestinazioniRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      RESPONSE: createEpsNestjsDestinazioniDto.RESPONSE,

      VALUE: createEpsNestjsDestinazioniDto.VALUE,

      KM: createEpsNestjsDestinazioniDto.KM,

      LINK: createEpsNestjsDestinazioniDto.LINK,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.epsNestjsDestinazioniRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: EpsNestjsDestinazioni['id']) {
    return this.epsNestjsDestinazioniRepository.findById(id);
  }

  findByIds(ids: EpsNestjsDestinazioni['id'][]) {
    return this.epsNestjsDestinazioniRepository.findByIds(ids);
  }

  async update(
    id: EpsNestjsDestinazioni['id'],

    updateEpsNestjsDestinazioniDto: UpdateEpsNestjsDestinazioniDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.epsNestjsDestinazioniRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      RESPONSE: updateEpsNestjsDestinazioniDto.RESPONSE,

      VALUE: updateEpsNestjsDestinazioniDto.VALUE,

      KM: updateEpsNestjsDestinazioniDto.KM,

      LINK: updateEpsNestjsDestinazioniDto.LINK,
    });
  }

  remove(id: EpsNestjsDestinazioni['id']) {
    return this.epsNestjsDestinazioniRepository.remove(id);
  }
}
