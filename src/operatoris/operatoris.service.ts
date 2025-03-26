import { Injectable } from '@nestjs/common';
import { CreateOperatoriDto } from './dto/create-operatori.dto';
import { UpdateOperatoriDto } from './dto/update-operatori.dto';
import { OperatoriRepository } from './infrastructure/persistence/operatori.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Operatori } from './domain/operatori';
import { FilterDto, SortDto } from '../utils/dto/filter-column';
import { OperatoriDto } from './dto/operatori.dto';

@Injectable()
export class OperatorisService {
  constructor(
    // Dependencies here
    private readonly operatoriRepository: OperatoriRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createOperatoriDto: CreateOperatoriDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.operatoriRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join,
  }: {
    filterOptions?: Array<FilterDto<OperatoriDto>> | null;
    sortOptions?: Array<SortDto<OperatoriDto>> | null;
    paginationOptions: IPaginationOptions;
    join: boolean;
  }) {
    return this.operatoriRepository.findAllWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      join,
    });
  }

  findById(COD_OP: Operatori['COD_OP']) {
    return this.operatoriRepository.findById(COD_OP);
  }

  findByIds(ids: Operatori['COD_OP'][]) {
    return this.operatoriRepository.findByIds(ids);
  }

  async update(
    COD_OP: Operatori['COD_OP'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateOperatoriDto: UpdateOperatoriDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.operatoriRepository.update(COD_OP, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(COD_OP: Operatori['COD_OP']) {
    return this.operatoriRepository.remove(COD_OP);
  }
}
