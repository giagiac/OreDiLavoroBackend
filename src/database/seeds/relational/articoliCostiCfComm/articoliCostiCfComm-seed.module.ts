import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticoliCostiCfCommEntity } from '../../../../articoli-costi-cf-comm/infrastructure/persistence/relational/entities/articoli-costi-cf-comm.entity';
import { ArticoliCostiCfCommSeedService } from './articoliCostiCfComm-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticoliCostiCfCommEntity])],
  providers: [ArticoliCostiCfCommSeedService],
  exports: [ArticoliCostiCfCommSeedService],
})
export class ArticoliCostiCfCommSeedModule {}
