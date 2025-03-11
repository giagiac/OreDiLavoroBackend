import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { artCostiRepository } from '../art-costi.repository';
import { ArtCostiEntity } from './entities/art-costi.entity';
import { artCostiRelationalRepository } from './repositories/art-costi.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArtCostiEntity])],
  providers: [
    {
      provide: artCostiRepository,
      useClass: artCostiRelationalRepository,
    },
  ],
  exports: [artCostiRepository],
})
export class RelationalartCostiPersistenceModule {}
