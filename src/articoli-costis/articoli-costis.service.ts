import { Injectable } from '@nestjs/common';
import { CreateArticoliCostiDto } from './dto/create-articoli-costi.dto';
import { UpdateArticoliCostiDto } from './dto/update-articoli-costi.dto';
import { ArticoliCostiRepository } from './infrastructure/persistence/articoli-costi.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ArticoliCosti } from './domain/articoli-costi';

@Injectable()
export class ArticoliCostisService {
  constructor(
    // Dependencies here
    private readonly articoliCostiRepository: ArticoliCostiRepository,
  ) {}

  // async create(createArticoliCostiDto: CreateArticoliCostiDto) {
  //   // Do not remove comment below.
  //   // <creating-property />

  //   return this.articoliCostiRepository.create({
  //     // Do not remove comment below.
  //     // <creating-property-payload />
  //     costo2: createArticoliCostiDto.costo2,

  //     costo1: createArticoliCostiDto.costo1,

  //     CF_COMM_ID: createArticoliCostiDto.CF_COMM_ID
  //   });
  // }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.articoliCostiRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  // findById(id: ArticoliCosti['id']) {
  //   return this.articoliCostiRepository.findById(id);
  // }

  // findByIds(ids: ArticoliCosti['id'][]) {
  //   return this.articoliCostiRepository.findByIds(ids);
  // }

  async update(
    CF_COMM_ID: ArticoliCosti['CF_COMM_ID'],
    updateArticoliCostiDto: UpdateArticoliCostiDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.articoliCostiRepository.update(CF_COMM_ID, {
      // Do not remove comment below.
      // <updating-property-payload />
      costo2: updateArticoliCostiDto.costo2,

      costo1: updateArticoliCostiDto.costo1
    });
  }

  // remove(id: ArticoliCosti['id']) {
  //   return this.articoliCostiRepository.remove(id);
  // }
}
