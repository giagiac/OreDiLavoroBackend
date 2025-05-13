import { Module } from '@nestjs/common';
import { OrdClisService } from './ord-clis.service';
import { OrdClisController } from './ord-clis.controller';
import { RelationalOrdCliPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationalOrdCliPersistenceModule
  : RelationalOrdCliPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [OrdClisController],
  providers: [OrdClisService],
  exports: [OrdClisService, infrastructurePersistenceModule],
})
export class OrdClisModule {}
