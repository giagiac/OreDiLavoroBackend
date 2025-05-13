import { Injectable } from '@nestjs/common';
import { CreateHypServReq2Dto } from './dto/create-hyp-serv-req2.dto';
import { UpdateHypServReq2Dto } from './dto/update-hyp-serv-req2.dto';
import { HypServReq2Repository } from './infrastructure/persistence/hyp-serv-req2.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { HypServReq2 } from './domain/hyp-serv-req2';

@Injectable()
export class HypServReq2Service {
  constructor(
    // Dependencies here
    private readonly appReq3HypServRepository: HypServReq2Repository,
  ) {}

  async create(createHypServReq2Dto: CreateHypServReq2Dto) {
    // Do not remove comment below.
    // <creating-property />

    return this.appReq3HypServRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      // COD_CHIAVE: createHypServReq2Dto.COD_CHIAVE,

      NUM_AZIENDA: createHypServReq2Dto.NUM_AZIENDA,

      COD_REQ2_HYPSERV: createHypServReq2Dto.COD_REQ3_HYPSERV,

      PROGR: createHypServReq2Dto.PROGR,

      UTENTE_FROM: createHypServReq2Dto.UTENTE_FROM,
    });
  }

  findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }) {
    return this.appReq3HypServRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(COD_CHIAVE: HypServReq2['COD_CHIAVE']) {
    return this.appReq3HypServRepository.findById(COD_CHIAVE);
  }

  findByIds(ids: HypServReq2['COD_CHIAVE'][]) {
    return this.appReq3HypServRepository.findByIds(ids);
  }

  async update(
    COD_CHIAVE: HypServReq2['COD_CHIAVE'],

    updateHypServReq2Dto: UpdateHypServReq2Dto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.appReq3HypServRepository.update(COD_CHIAVE, {
      // Do not remove comment below.
      // <updating-property-payload />
      COD_CHIAVE: updateHypServReq2Dto.COD_CHIAVE,

      NUM_AZIENDA: updateHypServReq2Dto.NUM_AZIENDA,

      COD_REQ2_HYPSERV: updateHypServReq2Dto.COD_REQ3_HYPSERV,

      PROGR: updateHypServReq2Dto.PROGR,

      UTENTE_FROM: updateHypServReq2Dto.UTENTE_FROM,
    });
  }

  remove(COD_CHIAVE: HypServReq2['COD_CHIAVE']) {
    return this.appReq3HypServRepository.remove(COD_CHIAVE);
  }
}
