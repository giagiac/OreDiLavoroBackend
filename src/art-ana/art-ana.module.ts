import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { art_anaController } from './art-ana.controller';
import { art_anaService } from './art-ana.service';
import { Relationalart_anaPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? Relationalart_anaPersistenceModule
  : Relationalart_anaPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [art_anaController],
  providers: [art_anaService],
  exports: [art_anaService, infrastructurePersistenceModule],
})
export class art_anaModule {}
