import { Module } from '@nestjs/common';
import { OperatorisService } from './operatoris.service';
import { OperatorisController } from './operatoris.controller';
import { RelationalOperatoriPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationalOperatoriPersistenceModule
  : RelationalOperatoriPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [OperatorisController],
  providers: [OperatorisService],
  exports: [OperatorisService, infrastructurePersistenceModule],
})
export class OperatorisModule {}
