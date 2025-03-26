import { Injectable } from '@nestjs/common';
import { CreateX1TrasCodiciDto } from './dto/create-x1-tras-codici.dto';
import { UpdateX1TrasCodiciDto } from './dto/update-x1-tras-codici.dto';
import { X1TrasCodiciRepository } from './infrastructure/persistence/x1-tras-codici.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { X1TrasCodici } from './domain/x1-tras-codici';

@Injectable()
export class X1TrasCodicisService {
  constructor(
    // Dependencies here
    private readonly x1TrasCodiciRepository: X1TrasCodiciRepository,
  ) {}

  async create(createX1TrasCodiciDto: CreateX1TrasCodiciDto) {
    // Do not remove comment below.
    // <creating-property />
    // return this.x1TrasCodiciRepository.create({
    //   // Do not remove comment below.
    //   // <creating-property-payload />
    //   CODICE2: createX1TrasCodiciDto.CODICE2,
    //   CODICE1: createX1TrasCodiciDto.CODICE1,
    // });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.x1TrasCodiciRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(CODICE1: X1TrasCodici['CODICE1']) {
    return this.x1TrasCodiciRepository.findById(CODICE1);
  }

  findByIds(ids: X1TrasCodici['CODICE1'][]) {
    return this.x1TrasCodiciRepository.findByIds(ids);
  }

  async update(
    CODICE1: X1TrasCodici['CODICE1'],

    updateX1TrasCodiciDto: UpdateX1TrasCodiciDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.x1TrasCodiciRepository.update(CODICE1, {
      // Do not remove comment below.
      // <updating-property-payload />
      CODICE2: updateX1TrasCodiciDto.CODICE2,
      CODICE1: updateX1TrasCodiciDto.CODICE1,
    });
  }

  remove(CODICE1: X1TrasCodici['CODICE1']) {
    return this.x1TrasCodiciRepository.remove(CODICE1);
  }
}
