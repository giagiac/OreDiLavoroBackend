import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ArticoliCostiCfEntity } from '../../../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';

@Injectable()
export class ArticoliCostiCfSeedService {
  constructor(
    @InjectRepository(ArticoliCostiCfEntity)
    private repository: Repository<ArticoliCostiCfEntity>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count();

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          COD_ART: '10030100003',
          COD_CF: '000004',
          TIPO_COSTO: 'IN_GIORNATA',
        }),
      );
      await this.repository.save(
        this.repository.create({
          COD_ART: '10070500002',
          COD_CF: '000004',
          TIPO_COSTO: 'IN_GIORNATA_DOPO_21',
        }),
      );
      await this.repository.save(
        this.repository.create({
          COD_ART: '10040900009',
          COD_CF: '000004',
          TIPO_COSTO: 'PERNOTTO_FUORISEDE_ANDATA',
        }),
      );
      await this.repository.save(
        this.repository.create({
          COD_ART: '10040900008',
          COD_CF: '000004',
          TIPO_COSTO: 'PERNOTTO_FUORISEDE_RITORNO',
        }),
      );
    }
  }
}
