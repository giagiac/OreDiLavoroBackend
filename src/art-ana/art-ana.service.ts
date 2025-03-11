import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { art_ana } from './domain/art-ana';
import { Updateart_anaDto } from './dto/update-art-ana.dto';
import { art_anaRepository } from './infrastructure/persistence/art-ana.repository';

@Injectable()
export class art_anaService {
  constructor(
    // Dependencies here
    private readonly artAnaRepository: art_anaRepository,
  ) {}

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.artAnaRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: art_ana['COD_ART']) {
    return this.artAnaRepository.findById(id);
  }

  findByIds(ids: art_ana['COD_ART'][]) {
    return this.artAnaRepository.findByIds(ids);
  }

  async update(
    id: art_ana['COD_ART'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateart_anaDto: Updateart_anaDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.artAnaRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: art_ana['COD_ART']) {
    return this.artAnaRepository.remove(id);
  }
}
