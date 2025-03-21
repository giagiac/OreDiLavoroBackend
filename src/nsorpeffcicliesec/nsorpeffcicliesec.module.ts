import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { RelationalnsorpeffcicliesecPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { nsorpeffcicliesecController } from './nsorpeffcicliesec.controller';
import { nsorpeffcicliesecService } from './nsorpeffcicliesec.service';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? RelationalnsorpeffcicliesecPersistenceModule
  : RelationalnsorpeffcicliesecPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [nsorpeffcicliesecController],
  providers: [nsorpeffcicliesecService],
  exports: [nsorpeffcicliesecService, infrastructurePersistenceModule],
})
export class NsorpeffcicliesecsModule {}
