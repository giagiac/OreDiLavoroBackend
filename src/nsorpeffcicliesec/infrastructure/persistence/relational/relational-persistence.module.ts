import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { nsorpeffcicliesecRepository } from '../nsorpeffcicliesec.repository';
import { nsorpeffcicliesecEntity } from './entities/nsorpeffcicliesec.entity';
import { nsorpeffcicliesecRelationalRepository } from './repositories/nsorpeffcicliesec.repository';

@Module({
  imports: [TypeOrmModule.forFeature([nsorpeffcicliesecEntity])],
  providers: [
    {
      provide: nsorpeffcicliesecRepository,
      useClass: nsorpeffcicliesecRelationalRepository,
    },
  ],
  exports: [nsorpeffcicliesecRepository],
})
export class RelationalnsorpeffcicliesecPersistenceModule {}
