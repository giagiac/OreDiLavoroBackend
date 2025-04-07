import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { CfCommController } from './cf-comm.controller';
import { CfCommService } from './cf-comm.service';
import { RelationalCfCommPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? RelationalCfCommPersistenceModule
  : RelationalCfCommPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [CfCommController],
  providers: [CfCommService],
  exports: [CfCommService, infrastructurePersistenceModule],
})
export class CfCommsModule {}
