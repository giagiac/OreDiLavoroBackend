import { Module } from '@nestjs/common';
import { CfsService } from './cfs.service';
import { CfsController } from './cfs.controller';
import { RelationalCfPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? RelationalCfPersistenceModule
  : RelationalCfPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [CfsController],
  providers: [CfsService],
  exports: [CfsService, infrastructurePersistenceModule],
})
export class CfsModule {}
