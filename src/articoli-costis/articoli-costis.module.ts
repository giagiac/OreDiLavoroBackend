import { Module } from '@nestjs/common';
import { ArticoliCostisService } from './articoli-costis.service';
import { ArticoliCostisController } from './articoli-costis.controller';
import { RelationalArticoliCostiPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? RelationalArticoliCostiPersistenceModule
  : RelationalArticoliCostiPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [ArticoliCostisController],
  providers: [ArticoliCostisService],
  exports: [ArticoliCostisService, infrastructurePersistenceModule],
})
export class ArticoliCostisModule {}
