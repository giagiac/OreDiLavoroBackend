import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ArticoliCostiCfCommEntity } from '../../../../articoli-costi-cf-comm/infrastructure/persistence/relational/entities/articoli-costi-cf-comm.entity';

@Injectable()
export class ArticoliCostiCfCommSeedService {
  constructor(
    @InjectRepository(ArticoliCostiCfCommEntity)
    private repository: Repository<ArticoliCostiCfCommEntity>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({});

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          COD_ART: '10140400099',
          CF_COMM_ID: '000004_1',
          TIPO_COSTO: 'IN_GIORNATA',
        }),
      );
      await this.repository.save(
        this.repository.create({
          COD_ART: '10140400095',
          CF_COMM_ID: '000004_1',
          TIPO_COSTO: 'IN_GIORNATA_DOPO_21',
        }),
      );
      await this.repository.save(
        this.repository.create({
          COD_ART: '10140400099',
          CF_COMM_ID: '000004_1',
          TIPO_COSTO: 'PERNOTTO_FUORISEDE_ANDATA',
        }),
      );
      await this.repository.save(
        this.repository.create({
          COD_ART: '10040900002',
          CF_COMM_ID: '000004_1',
          TIPO_COSTO: 'PERNOTTO_FUORISEDE_RITORNO',
        }),
      );
    }
  }
}
