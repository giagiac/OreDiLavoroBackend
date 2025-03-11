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

  findById(id: ArticoliCostiCf['id']) {
    return this.articoliCostiCfRepository.findById(id);
  }

  findByIds(ids: ArticoliCostiCf['id'][]) {
    return this.articoliCostiCfRepository.findByIds(ids);
  }

  async update(
    id: ArticoliCostiCf['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateArticoliCostiCfDto: UpdateArticoliCostiCfDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.articoliCostiCfRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ArticoliCostiCf['id']) {
    return this.articoliCostiCfRepository.remove(id);
  }
}
