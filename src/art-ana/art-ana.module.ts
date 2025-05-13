import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { art_anaController } from './art-ana.controller';
import { ArtAnaService } from './art-ana.service';
import { RelationalArtAnaPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationalArtAnaPersistenceModule
  : RelationalArtAnaPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [art_anaController],
  providers: [ArtAnaService],
  exports: [ArtAnaService, infrastructurePersistenceModule],
})
export class ArtAnaModule {}
