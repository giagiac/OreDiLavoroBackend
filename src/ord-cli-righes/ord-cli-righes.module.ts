import { Module } from '@nestjs/common';
import { OrdCliRighesService } from './ord-cli-righes.service';
import { OrdCliRighesController } from './ord-cli-righes.controller';
import { RelationalOrdCliRighePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationalOrdCliRighePersistenceModule
  : RelationalOrdCliRighePersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [OrdCliRighesController],
  providers: [OrdCliRighesService],
  exports: [OrdCliRighesService, infrastructurePersistenceModule],
})
export class OrdCliRighesModule {}
