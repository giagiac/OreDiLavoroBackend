import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtAnaRepository } from '../art-ana.repository';
import { ArtAnaEntity } from './entities/art-ana.entity';
import { ArtAnanaRelationalRepository } from './repositories/art-ana.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArtAnaEntity])],
  providers: [
    {
      provide: ArtAnaRepository,
      useClass: ArtAnanaRelationalRepository,
    },
  ],
  exports: [ArtAnaRepository],
})
export class RelationalArtAnaPersistenceModule {}
