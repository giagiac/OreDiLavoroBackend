import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { RelationaltipiCostiArtPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { tipiCostiArtsController } from './tipi-costi-art.controller';
import { tipiCostiArtsService } from './tipi-costi-art.service';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationaltipiCostiArtPersistenceModule
  : RelationaltipiCostiArtPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [tipiCostiArtsController],
  providers: [tipiCostiArtsService],
  exports: [tipiCostiArtsService, infrastructurePersistenceModule],
})
export class TipiCostiArtsModule {}
