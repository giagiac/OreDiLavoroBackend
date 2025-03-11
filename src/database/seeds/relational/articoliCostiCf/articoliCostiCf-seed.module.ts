import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticoliCostiCfEntity } from '../../../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';
import { ArticoliCostiCfSeedService } from './articoliCostiCf-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticoliCostiCfEntity])],
  providers: [ArticoliCostiCfSeedService],
  exports: [ArticoliCostiCfSeedService],
})
export class ArticoliCostiCfSeedModule {}
