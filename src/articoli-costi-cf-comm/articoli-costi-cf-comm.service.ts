import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ArticoliCostiCfComm } from './domain/articoli-costi-cf-comm';
import { UpdateArticoliCostiCfCommDto } from './dto/update-articoli-costi-cf-comm.dto';
import { ArticoliCostiCfCommRepository } from './infrastructure/persistence/articoli-costi-cf-comm.repository';

@Injectable()
export class ArticoliCostiCfCommService {
  constructor(
    // Dependencies here
    private readonly articoliCostiCfCommRepository: ArticoliCostiCfCommRepository,
  ) {}

  findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }) {
    return this.articoliCostiCfCommRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  async update(CF_COMM_ID: ArticoliCostiCfComm['CF_COMM_ID'], updateArticoliCostiDto: UpdateArticoliCostiCfCommDto) {
    // Do not remove comment below.
    // <updating-property />

    return this.articoliCostiCfCommRepository.update(CF_COMM_ID, updateArticoliCostiDto);
  }

  remove(CF_COMM_ID: ArticoliCostiCfComm['CF_COMM_ID']) {
    return this.articoliCostiCfCommRepository.remove(CF_COMM_ID);
  }
}
