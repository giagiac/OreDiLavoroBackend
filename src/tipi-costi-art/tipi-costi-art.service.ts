import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { tipiCostiArt } from './domain/tipi-costi-art';
import { CreatetipiCostiArtDto } from './dto/create-tipi-costi-art.dto';
import { UpdatetipiCostiArtDto } from './dto/update-tipi-costi-art.dto';
import { tipiCostiArtRepository } from './infrastructure/persistence/tipi-costi-art.repository';

@Injectable()
export class tipiCostiArtsService {
  constructor(
    // Dependencies here
    private readonly tipiCostiArtRepository: tipiCostiArtRepository,
  ) {}

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.tipiCostiArtRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: tipiCostiArt['COD_TIPO_COST']) {
    return this.tipiCostiArtRepository.findById(id);
  }

  findByIds(ids: tipiCostiArt['COD_TIPO_COST'][]) {
    return this.tipiCostiArtRepository.findByIds(ids);
  }

  async update(
    id: tipiCostiArt['COD_TIPO_COST'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatetipiCostiArtDto: UpdatetipiCostiArtDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.tipiCostiArtRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: tipiCostiArt['COD_TIPO_COST']) {
    return this.tipiCostiArtRepository.remove(id);
  }
}
