import { Module } from '@nestjs/common';
import { X1TrasCodicisService } from './x1-tras-codicis.service';
import { X1TrasCodicisController } from './x1-tras-codicis.controller';
import { RelationalX1TrasCodiciPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? RelationalX1TrasCodiciPersistenceModule
  : RelationalX1TrasCodiciPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [X1TrasCodicisController],
  providers: [X1TrasCodicisService],
  exports: [X1TrasCodicisService, infrastructurePersistenceModule],
})
export class X1TrasCodicisModule {}
