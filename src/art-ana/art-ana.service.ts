import { Injectable } from '@nestjs/common';
import { FilterDto } from '../utils/dto/filter-column';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ArtAna } from './domain/art-ana';
import { ArtAnaDto } from './dto/art-ana.dto';
import { SortArtAnaDto } from './dto/find-all-art-ana.dto';
import { UpdateArtAnanaDto } from './dto/update-art-ana.dto';
import { ArtAnaRepository } from './infrastructure/persistence/art-ana.repository';

@Injectable()
export class ArtAnaService {
  constructor(
    // Dependencies here
    private readonly artAnaRepository: ArtAnaRepository,
  ) {}

  findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: Array<FilterDto<ArtAnaDto>> | null;
    sortOptions?: Array<SortArtAnaDto> | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.artAnaRepository.findAllWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ArtAna['COD_ART']) {
    return this.artAnaRepository.findById(id);
  }

  findByIds(ids: ArtAna['COD_ART'][]) {
    return this.artAnaRepository.findByIds(ids);
  }

  async update(
    id: ArtAna['COD_ART'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateart_anaDto: UpdateArtAnanaDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.artAnaRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ArtAna['COD_ART']) {
    return this.artAnaRepository.remove(id);
  }
}
