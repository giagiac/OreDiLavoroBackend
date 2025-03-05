import { Module } from '@nestjs/common';
import { ArticoliCostiRepository } from '../articoli-costi.repository';
import { ArticoliCostiRelationalRepository } from './repositories/articoli-costi.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticoliCostiEntity } from './entities/articoli-costi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticoliCostiEntity])],
  providers: [
    {
      provide: ArticoliCostiRepository,
      useClass: ArticoliCostiRelationalRepository,
    },
  ],
  exports: [ArticoliCostiRepository],
})
export class RelationalArticoliCostiPersistenceModule {}
