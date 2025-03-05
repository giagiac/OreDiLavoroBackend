import { Module } from '@nestjs/common';
import { CfCommsService } from './cf-comms.service';
import { CfCommsController } from './cf-comms.controller';
import { RelationalCfCommPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? RelationalCfCommPersistenceModule
  : RelationalCfCommPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [CfCommsController],
  providers: [CfCommsService],
  exports: [CfCommsService, infrastructurePersistenceModule],
})
export class CfCommsModule {}
