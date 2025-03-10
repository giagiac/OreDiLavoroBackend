import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { ArticoliCostiCfController } from './articoli-costi-cf.controller';
import { ArticoliCostiCfService } from './articoli-costi-cf.service';
import { RelationalArticoliCostiCfPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? RelationalArticoliCostiCfPersistenceModule
  : RelationalArticoliCostiCfPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [ArticoliCostiCfController],
  providers: [ArticoliCostiCfService],
  exports: [ArticoliCostiCfService, infrastructurePersistenceModule],
})
export class ArticoliCostiCfsModule {}
