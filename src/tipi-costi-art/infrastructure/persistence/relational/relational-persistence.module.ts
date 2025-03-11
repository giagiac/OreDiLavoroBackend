import { Module } from '@nestjs/common';
import { tipiCostiArtRepository } from '../tipi-costi-art.repository';
import { tipiCostiArtRelationalRepository } from './repositories/tipi-costi-art.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tipiCostiArtEntity } from './entities/tipi-costi-art.entity';

@Module({
  imports: [TypeOrmModule.forFeature([tipiCostiArtEntity])],
  providers: [
    {
      provide: tipiCostiArtRepository,
      useClass: tipiCostiArtRelationalRepository,
    },
  ],
  exports: [tipiCostiArtRepository],
})
export class RelationaltipiCostiArtPersistenceModule {}
