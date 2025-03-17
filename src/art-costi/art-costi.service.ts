import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ArtCosti } from './domain/art-costi';
import { UpdateartCostiDto } from './dto/update-art-costi.dto';
import { artCostiRepository } from './infrastructure/persistence/art-costi.repository';

@Injectable()
export class artCostisService {
  constructor(
    // Dependencies here
    private readonly artCostiRepository: artCostiRepository,
  ) {}

  findAllWithPagination({
    paginationOptions,
    COD_ART,
  }: {
    paginationOptions: IPaginationOptions;
    COD_ART: String;
  }) {
    return this.artCostiRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      COD_ART,
    });
  }

  findById(id: ArtCosti['COD_ART_TIPO_COST']) {
    return this.artCostiRepository.findById(id);
  }

  findByIds(ids: ArtCosti['COD_ART_TIPO_COST'][]) {
    return this.artCostiRepository.findByIds(ids);
  }

  async update(
    id: ArtCosti['COD_ART_TIPO_COST'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateartCostiDto: UpdateartCostiDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.artCostiRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ArtCosti['COD_ART_TIPO_COST']) {
    return this.artCostiRepository.remove(id);
  }
}
