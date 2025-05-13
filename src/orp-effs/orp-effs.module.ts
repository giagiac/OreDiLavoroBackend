import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { RelationalOrpEffPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrpEffsController } from './orp-effs.controller';
import { OrpEffsService } from './orp-effs.service';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationalOrpEffPersistenceModule
  : RelationalOrpEffPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [OrpEffsController],
  providers: [OrpEffsService],
  exports: [OrpEffsService, infrastructurePersistenceModule],
})
export class OrpEffsModule {}
