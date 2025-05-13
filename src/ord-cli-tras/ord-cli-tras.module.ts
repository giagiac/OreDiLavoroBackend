import { Module } from '@nestjs/common';
import { OrdCliTrasService } from './ord-cli-tras.service';
import { OrdCliTrasController } from './ord-cli-tras.controller';
import { RelationalOrdCliTrasPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationalOrdCliTrasPersistenceModule
  : RelationalOrdCliTrasPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [OrdCliTrasController],
  providers: [OrdCliTrasService],
  exports: [OrdCliTrasService, infrastructurePersistenceModule],
})
export class OrdCliTrasModule {}
