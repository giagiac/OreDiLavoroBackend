import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticoliCostiCfCommRepository } from '../articoli-costi-cf-comm.repository';
import { ArticoliCostiCfCommEntity } from './entities/articoli-costi-cf-comm.entity';
import { ArticoliCostiCfCommRelationalRepository } from './repositories/articoli-costi-cf-comm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArticoliCostiCfCommEntity])],
  providers: [
    {
      provide: ArticoliCostiCfCommRepository,
      useClass: ArticoliCostiCfCommRelationalRepository,
    },
  ],
  exports: [ArticoliCostiCfCommRepository],
})
export class RelationalArticoliCostiCfCommPersistenceModule {}
