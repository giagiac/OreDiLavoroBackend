import { Module } from '@nestjs/common';
import { art_anaRepository } from '../art-ana.repository';
import { art_anaRelationalRepository } from './repositories/art-ana.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { art_anaEntity } from './entities/art-ana.entity';

@Module({
  imports: [TypeOrmModule.forFeature([art_anaEntity])],
  providers: [
    {
      provide: art_anaRepository,
      useClass: art_anaRelationalRepository,
    },
  ],
  exports: [art_anaRepository],
})
export class Relationalart_anaPersistenceModule {}
