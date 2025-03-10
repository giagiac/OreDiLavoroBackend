import { Module } from '@nestjs/common';
import { ArticoliCostiCfRepository } from '../articoli-costi-cf.repository';
import { ArticoliCostiCfRelationalRepository } from './repositories/articoli-costi-cf.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticoliCostiCfEntity } from './entities/articoli-costi-cf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticoliCostiCfEntity])],
  providers: [
    {
      provide: ArticoliCostiCfRepository,
      useClass: ArticoliCostiCfRelationalRepository,
    },
  ],
  exports: [ArticoliCostiCfRepository],
})
export class RelationalArticoliCostiCfPersistenceModule {}
