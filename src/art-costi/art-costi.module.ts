import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { artCostisController } from './art-costi.controller';
import { artCostisService } from './art-costi.service';
import { RelationalartCostiPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? RelationalartCostiPersistenceModule
  : RelationalartCostiPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [artCostisController],
  providers: [artCostisService],
  exports: [artCostisService, infrastructurePersistenceModule],
})
export class artCostiModule {}
