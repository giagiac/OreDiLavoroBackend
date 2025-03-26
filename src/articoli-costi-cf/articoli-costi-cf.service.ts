import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ArticoliCostiCf } from './domain/articoli-costi-cf';
import { UpdateArticoliCostiCfDto } from './dto/update-articoli-costi-cf.dto';
import { ArticoliCostiCfRepository } from './infrastructure/persistence/articoli-costi-cf.repository';

@Injectable()
export class ArticoliCostiCfService {
  constructor(
    // Dependencies here
    private readonly articoliCostiCfRepository: ArticoliCostiCfRepository,
  ) {}

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.articoliCostiCfRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  async update(
    COD_CF: ArticoliCostiCf['COD_CF'],

    updateArticoliCostiCfDto: UpdateArticoliCostiCfDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.articoliCostiCfRepository.update(
      COD_CF,
      updateArticoliCostiCfDto,
    );
  }

  remove(COD_CF: ArticoliCostiCf['COD_CF']) {
    return this.articoliCostiCfRepository.remove(COD_CF);
  }
}
