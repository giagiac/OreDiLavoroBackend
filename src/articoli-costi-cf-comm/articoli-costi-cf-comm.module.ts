import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { ArticoliCostiCfCommController } from './articoli-costi-cf-comm.controller';
import { ArticoliCostiCfCommService } from './articoli-costi-cf-comm.service';
import { RelationalArticoliCostiCfCommPersistenceModule } from './infrastructure/persistence/relational/relational-persistence-cf-comm.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationalArticoliCostiCfCommPersistenceModule
  : RelationalArticoliCostiCfCommPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [ArticoliCostiCfCommController],
  providers: [ArticoliCostiCfCommService],
  exports: [ArticoliCostiCfCommService, infrastructurePersistenceModule],
})
export class ArticoliCostiCfCommModule {}
